import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApartCard} from '../../shared/components/apart-card/apart-card';
import {CommonModule} from '@angular/common';
import {PhoneMaskDirective} from '../../shared/directives/phone-mask';
import {ApartmentService} from '../../shared/services/apartment.service';
import {Apartment} from '../../../types/apartment.type';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, ApartCard, PhoneMaskDirective],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main implements OnInit{
  @ViewChild('apartmentItems') apartmentItems!: ElementRef;
  @ViewChild('showAllBtn') showAllBtn!: ElementRef;
  @ViewChild('apartmentBlock') apartmentBlock!: ElementRef;
  @ViewChild('popupOverlay') popupOverlay!: ElementRef;
  @ViewChild('popup') popup!: ElementRef;
  apartmentsData:Apartment[] = [];
  loading = true;
  constructor(private apartmentService: ApartmentService) {}

  ngOnInit() {
    this.loadPopularApartments();
    this.showPopup();
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
}
