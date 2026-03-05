
import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Apartment} from '../../../types/apartment.type';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ApartmentService} from '../../shared/services/apartment.service';
import {CommonModule} from '@angular/common';
import {PhoneMaskDirective} from '../../shared/directives/phone-mask';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-apartment',
  standalone:true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, PhoneMaskDirective],
  templateUrl: './apartment.html',
  styleUrl: './apartment.css'
})
export class ApartmentComponent implements OnInit, OnDestroy {
  apartment: Apartment | undefined;
  loading = true;
  error = false;

  currentSlideIndex = 0;
  private slideInterval: any;

  amenitiesIsOpen: boolean = false;
  rulesIsOpen: boolean = false;

  contactForm: FormGroup;
  isSubmitting = false;
  showSuccessMessage = false;

  constructor(
    private route: ActivatedRoute,
    private apartmentService: ApartmentService,
    private fb: FormBuilder
  ) {
    this.contactForm = this.fb.group({
      apartment: [''],
      address: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/)]],
      email: ['', [Validators.email]],
      message: [''],
      agreement: [false, Validators.requiredTrue]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadApartment(id);
    } else {
      this.error = true;
      this.loading = false;
    }
  }

  ngOnDestroy() {
    this.stopSlideShow();
  }

  toggleRulesClass() {
    this.rulesIsOpen = !this.rulesIsOpen;
  }

  toggleAmenitiesClass() {
    this.amenitiesIsOpen = !this.amenitiesIsOpen;
  }

  loadApartment(id: string) {
    this.loading = true;
    this.apartmentService.getApartmentById(id).subscribe({
      next: (apartment) => {
        if (apartment) {
          this.apartment = apartment;
          this.updateFormWithApartmentData();
          this.startSlideShow();
        } else {
          this.error = true;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Ошибка при загрузке квартиры:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  // Методы для формы
  private updateFormWithApartmentData() {
    if (this.apartment) {
      this.contactForm.patchValue({
        apartment: this.apartment.name,
        address: this.apartment.address
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.invalid && field.dirty : false;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;

      // Здесь будет логика отправки формы
      console.log('Form submitted:', this.contactForm.value);

      // Имитация отправки
      setTimeout(() => {
        this.isSubmitting = false;
        this.showSuccessMessage = true;
        this.contactForm.reset();

        // Скрыть сообщение через 5 секунд
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 5000);
      }, 1500);
    } else {
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);
        control?.markAsTouched();
      });
    }
  }
  getPriceDisplay(): string {
    if (!this.apartment) return '';
    return this.apartment.isLongTerm
      ? `${this.apartment.price} ₽/мес`
      : `${this.apartment.price} ₽/сутки`;
  }

// Получить текст типа аренды
  getRentalTypeText(): string {
    return this.apartment?.isLongTerm ? 'Долгосрочно' : 'Посуточно';
  }

// Получить класс для бейджа
  getRentalBadgeClass(): string {
    return this.apartment?.isLongTerm ? 'badge-long-term' : 'badge-short-term';
  }
  // Методы для слайдера
  startSlideShow() {
    if (this.apartment && this.apartment.images.length > 1) {
      this.slideInterval = setInterval(() => {
        this.nextSlide();
      }, 5000);
    }
  }

  stopSlideShow() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  nextSlide() {
    if (this.apartment && this.currentSlideIndex < this.apartment.images.length - 1) {
      this.currentSlideIndex++;
      this.resetSlideShow();
    }
  }

  prevSlide() {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
      this.resetSlideShow();
    }
  }

  goToSlide(index: number) {
    if (index >= 0 && this.apartment && index < this.apartment.images.length) {
      this.currentSlideIndex = index;
      this.resetSlideShow();
    }
  }

  private resetSlideShow() {
    this.stopSlideShow();
    this.startSlideShow();
  }
}
