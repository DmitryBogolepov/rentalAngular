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
      name: 'Анна Иванова',
      rating: 5,
      date: '15 марта 2024',
      text: 'Отличный сервис! Всё сделали быстро и качественно. Очень довольна результатом. Обязательно буду рекомендовать друзьям и знакомым. Спасибо большое команде профессионалов!'
    },
    {
      id: 2,
      name: 'Михаил Петров',
      rating: 5,
      date: '10 марта 2024',
      text: 'Работа выполнена на высшем уровне. Всё чётко, по договорённости. Приятно удивлён подходом к клиенту. Отдельное спасибо менеджеру за консультацию и помощь в выборе.'
    },
    {
      id: 3,
      name: 'Елена Смирнова',
      rating: 4,
      date: '5 марта 2024',
      text: 'Хорошая компания, всё сделали в срок. Немного задержались с доставкой, но качество работы это компенсировало. Рекомендую!'
    },
    {
      id: 4,
      name: 'Дмитрий Козлов',
      rating: 5,
      date: '28 февраля 2024',
      text: 'Профессионалы своего дела! Обратился по рекомендации, ни разу не пожалел. Цены адекватные, качество отличное. Буду обращаться ещё.'
    },
    {
      id: 5,
      name: 'Ольга Новикова',
      rating: 5,
      date: '20 февраля 2024',
      text: 'Очень понравилось работать с этой компанией. Внимательные специалисты, учли все мои пожелания. Результат превзошёл ожидания!'
    },
    {
      id: 6,
      name: 'Алексей Воробьев',
      rating: 4,
      date: '15 февраля 2024',
      text: 'Хороший сервис, вежливый персонал. Всё объяснили, показали. Единственное - пришлось подождать своей очереди. Но результатом доволен.'
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
