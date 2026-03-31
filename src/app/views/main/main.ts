import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApartCard} from '../../shared/components/apart-card/apart-card';
import {CommonModule} from '@angular/common';
import {PhoneMaskDirective} from '../../shared/directives/phone-mask';
import {ApartmentService} from '../../shared/services/apartment.service';
import {Apartment} from '../../../types/apartment.type';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
}
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, ApartCard, PhoneMaskDirective, ReactiveFormsModule],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main implements OnInit, AfterViewInit{
  @ViewChild('apartmentItems') apartmentItems!: ElementRef;
  @ViewChild('showAllBtn') showAllBtn!: ElementRef;
  @ViewChild('apartmentBlock') apartmentBlock!: ElementRef;
  @ViewChild('popupOverlay') popupOverlay!: ElementRef;
  @ViewChild('popup') popup!: ElementRef;
  apartmentsData:Apartment[] = [];
  loading = true;
  contactForm!: FormGroup;
  isSubmitting = false;
  showSuccessMessage = false;
  errorMessage = '';


  reviews: Review[] = [
    {
      id: 1,
      name: 'Татьяна',
      rating: 5,
      date: '3 января 2026',
      text: 'Квартира как на фото , удобная локация все рядом кафе, рестораны, торговый центр. Очень приятная менеджер Александра всегда на связи.'
    },
    {
      id: 2,
      name: 'Анастасия',
      rating: 5,
      date: '4 февраля 2025',
      text: 'Хорошая квартира, дружелюбные ребята сдают.\n' +
        'Расположение ТОП , рядом столовая и прокат, ТЦ в 5 минутах, как и подьемники на Красную поляну и Газпром. Так же рядом ЖД Роза хутор.'
    },
    {
      id: 3,
      name: 'Александра',
      rating: 5,
      date: '6 сентября 2024',
      text: 'Мы жили в квартире 20 дней в августе. Нас всё устроило. Хорошая, чистая квартира. Прекрасное расположение. Есть абсолютно всё для комфортной жизни. С удовольствием вернёмся в следующем году.'
    },
    {
      id: 4,
      name: 'Екатерина',
      rating: 5,
      date: '8 августа 2025',
      text: 'Квартира замечательная, хороший ремонт, отличная техника, дом находится в тихой части улицы, из окон прекрасный вид на ёлки и горы. Хороший дом, есть парковка. Очень рекомендую'
    },
    {
      id: 5,
      name: 'Андрей',
      rating: 5,
      date: '24 марта 2026',
      text: 'Очень классная квартира. Каждое утро это праздник с таким видом!'
    },
    {
      id: 6,
      name: 'Борис',
      rating: 5,
      date: '2 февраля 2025',
      text: 'Уютная, просторная квартира с красивым видом, удобное расположение, все удобства имеются.'
    }
  ];

  currentSlide = 0;
  slidesToShow = 1;
  totalSlides = this.reviews.length;
  maxSlideIndex = 0;
  constructor(private apartmentService: ApartmentService, private fb: FormBuilder) {}

  ngOnInit() {
    this.loadPopularApartments();
    this.showPopup();
    this.updateSlidesToShow();
    this.initForm();
  }

  ngAfterViewInit(): void {
    window.addEventListener('resize', this.updateSlidesToShow.bind(this));
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/)]],
      email: ['', [Validators.email]],
      message: ['', [Validators.maxLength(1000)]],
      agreement: [false, Validators.requiredTrue]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.invalid && (field.dirty) : false;
  }



  loadPopularApartments() {
    this.loading = true;
    this.apartmentService.getPopularApartments().subscribe({
      next: (apartments) => {
        this.apartmentsData = apartments;
        this.loading = false;
      },
      error: (error) => {
        console.error('Ошибка при загрузке квартир:', error);
        this.loading = false;
      }
    });
  }

  showPopup() {
    setTimeout(() => {
      this.popup.nativeElement.style.display = 'block';
      this.popupOverlay.nativeElement.style.display = 'block';
    }, 5000)
  }

  hidePopup() {
    this.popup.nativeElement.style.display = 'none';
    this.popupOverlay.nativeElement.style.display = 'none';
  }
  toggleShow() {
    const items = this.apartmentItems.nativeElement;
    const btn = this.showAllBtn.nativeElement;
    const block = this.apartmentBlock.nativeElement;

    items.classList.toggle('hidden');

    if (items.classList.contains('hidden')) {
      btn.innerText = 'Посмотреть все';
      block.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      btn.innerText = 'Скрыть';
    }
  }


  updateMaxSlideIndex() {
    this.maxSlideIndex = Math.max(0, this.totalSlides - this.slidesToShow);
  }
  updateSlidesToShow(): void {
    if (window.innerWidth >= 1024) {
      this.slidesToShow = 3;
    } else if (window.innerWidth >= 768) {
      this.slidesToShow = 2;
    } else {
      this.slidesToShow = 1;
    }
    this.updateMaxSlideIndex();
    if (this.currentSlide > this.maxSlideIndex) {
      this.currentSlide = this.maxSlideIndex;
    }
  }

  nextSlide(): void {
    if (this.currentSlide < this.maxSlideIndex) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }
  }

  prevSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.maxSlideIndex;
    }
  }

  goToSlide(index: number): void {
    if (index >= 0 && index <= this.maxSlideIndex) {
      this.currentSlide = index;
    }
  }
  getTotalSlidesCount(): number {
    return this.maxSlideIndex + 1;
  }
  getDotIndices(): number[] {
    const count = this.getTotalSlidesCount();
    return Array(count).fill(0).map((_, i) => i);
  }

  getRatingStars(rating: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push('★');
      } else {
        stars.push('☆');
      }
    }
    return stars;
  }
}
