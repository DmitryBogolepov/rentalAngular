import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Apartment} from '../../../../types/apartment.type';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {TextTruncateDirective} from '../../directives/text-truncate.directive';

@Component({
  selector: 'app-apart-card',
  imports: [CommonModule, TextTruncateDirective],
  standalone:true,
  templateUrl: './apart-card.html',
  styleUrl: './apart-card.css',
})
export class ApartCard {
  @Input() apartment!: Apartment;
  @Output() onContact = new EventEmitter<number>();
  constructor(private router: Router) {}
  currentSlide = 0;
  goToApartmentPage() {
    this.router.navigate(['/apartment', this.apartment.id]);
  }
  prevSlide() {
    this.currentSlide = this.currentSlide === 0
      ? this.apartment.images.length - 1
      : this.currentSlide - 1;
  }

  nextSlide() {
    this.currentSlide = this.currentSlide === this.apartment.images.length - 1
      ? 0
      : this.currentSlide + 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}
