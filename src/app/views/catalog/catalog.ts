import { Component, HostListener, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { debounceTime } from 'rxjs';
import { Apartment } from '../../../types/apartment.type';
import { ActiveParamsType } from '../../../types/active-params.type';
import { AppliedFilterType } from '../../../types/applied-filter.type';
import {ApartCard} from '../../shared/components/apart-card/apart-card';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ApartmentService} from '../../shared/services/apartment.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  templateUrl: './catalog.html',
  imports: [
    CommonModule,
    FormsModule,
    ApartCard,
    RouterLink
  ],
  styleUrls: ['./catalog.css']
})
export class Catalog implements OnInit {
  allApartments: Apartment[] = [];

  filteredApartments: Apartment[] = [];
  displayedApartments: Apartment[] = [];

  activeParams: ActiveParamsType = {
    page: 1,
    rooms: []
  };

  appliedFilters: AppliedFilterType[] = [];
  sortingOpen = false;

  sortingOptions: { name: string, value: string }[] = [
    { name: 'По умолчанию', value: 'default' },
    { name: 'По возрастанию цены', value: 'price-asc' },
    { name: 'По убыванию цены', value: 'price-desc' },
  ];

  pages: number[] = [];
  itemsPerPage = 6;
  totalPages = 0;

  roomOptions = [1, 2, 3, 4, 5];
  priceMin = 0;
  priceMax = 50000;

  roomsFilterOpen = false;
  priceFilterOpen = false;
  rentalTypeFilterOpen = false;
  loading = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apartmentService: ApartmentService
  ) {}

  ngOnInit(): void {
    // Загружаем квартиры
    this.loadAllApartments();

    // Подписываемся на изменения параметров
    this.activatedRoute.queryParams
      .pipe(debounceTime(300))
      .subscribe(params => {
        // Сохраняем параметры
        this.parseParams(params);

        // Если данные уже загружены, применяем фильтры
        if (this.allApartments.length > 0) {
          this.applyFilters();
        }
      });
  }

  loadAllApartments() {
    this.loading = true;
    this.apartmentService.getApartments().subscribe({
      next: (apartments) => {
        this.allApartments = apartments;

        // Получаем текущие параметры из URL
        const currentParams = this.activatedRoute.snapshot.queryParams;
        this.parseParams(currentParams);

        // Применяем фильтры
        this.applyFilters();

        this.loading = false;
      },
      error: (error) => {
        console.error('Ошибка при загрузке квартир:', error);
        this.loading = false;
      }
    });
  }

  // Новый метод для применения фильтров
  applyFilters(): void {
    this.filterApartments();
    this.updatePagination();
    this.updateAppliedFilters();
  }

  resetAllFilters(): void {
    this.activeParams = {
      page: 1,
      rooms: [],
      sort: 'default',
      rentalTypes: []
    };

    this.priceMin = 0;
    this.priceMax = 50000;

    this.updateUrl();
    this.applyFilters();
  }

  handleContact(apartmentId: number): void {
    console.log('Связаться по квартире:', apartmentId);
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  }

  parseParams(params: any): void {
    this.activeParams = {
      page: params['page'] ? +params['page'] : 1,
      sort: params['sort'] || 'default',
      priceFrom: params['priceFrom'] ? +params['priceFrom'] : undefined,
      priceTo: params['priceTo'] ? +params['priceTo'] : undefined,
      rooms: params['rooms'] ? (Array.isArray(params['rooms']) ? params['rooms'] : [params['rooms']]) : [],
      rentalTypes: params['rentalTypes'] ? (Array.isArray(params['rentalTypes']) ? params['rentalTypes'] : [params['rentalTypes']]) : []
    };
  }

  filterApartments(): void {
    if (!this.allApartments.length) return;

    this.filteredApartments = this.allApartments.filter(apt => {
      // Фильтр по цене
      if (this.activeParams.priceFrom && apt.price < this.activeParams.priceFrom) return false;
      if (this.activeParams.priceTo && apt.price > this.activeParams.priceTo) return false;

      // Фильтр по комнатам
      if (this.activeParams.rooms && this.activeParams.rooms.length > 0) {
        if (!this.activeParams.rooms.includes(apt.rooms.toString())) return false;
      }

      // Фильтр по типу аренды
      if (this.activeParams.rentalTypes && this.activeParams.rentalTypes.length > 0) {
        const isLongTerm = apt.isLongTerm ? 'long' : 'short';
        if (!this.activeParams.rentalTypes.includes(isLongTerm)) return false;
      }

      return true;
    });

    this.sortApartments();
    this.updateDisplayedApartments();
  }

  sortApartments(): void {
    switch (this.activeParams.sort) {
      case 'price-asc':
        this.filteredApartments.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.filteredApartments.sort((a, b) => b.price - a.price);
        break;
      default:
        this.filteredApartments.sort((a, b) => a.id - b.id);
        break;
    }
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredApartments.length / this.itemsPerPage);
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }

    if (this.activeParams.page && this.activeParams.page > this.totalPages) {
      this.activeParams.page = this.totalPages || 1;
    }
  }

  updateDisplayedApartments(): void {
    const startIndex = ((this.activeParams.page || 1) - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedApartments = this.filteredApartments.slice(startIndex, endIndex);
  }

  updateAppliedFilters(): void {
    this.appliedFilters = [];
    if (this.activeParams.priceFrom || this.activeParams.priceTo) {
      let priceText = 'Цена:';
      if (this.activeParams.priceFrom && this.activeParams.priceTo) {
        priceText += ` от ${this.activeParams.priceFrom} до ${this.activeParams.priceTo} ₽`;
      } else if (this.activeParams.priceFrom) {
        priceText += ` от ${this.activeParams.priceFrom} ₽`;
      } else if (this.activeParams.priceTo) {
        priceText += ` до ${this.activeParams.priceTo} ₽`;
      }
      this.appliedFilters.push({
        name: priceText,
        urlParam: 'price'
      });
    }
    if (this.activeParams.rooms && this.activeParams.rooms.length > 0) {
      const roomsText = this.activeParams.rooms.length === 5
        ? 'Все комнаты'
        : `${this.activeParams.rooms.map(r => {
          const num = parseInt(r);
          return num + (num === 1 ? ' комната' : num < 5 ? ' комнаты' : ' комнат');
        }).join(', ')}`;
      this.appliedFilters.push({
        name: roomsText,
        urlParam: 'rooms'
      });
    }
    if (this.activeParams.rentalTypes && this.activeParams.rentalTypes.length > 0) {
      const rentalText = this.activeParams.rentalTypes.length === 2
        ? 'Все типы аренды'
        : this.activeParams.rentalTypes.includes('long')
          ? 'Долгосрочная аренда'
          : 'Посуточная аренда';
      this.appliedFilters.push({
        name: rentalText,
        urlParam: 'rentalTypes'
      });
    }
  }

  sort(value: string): void {
    this.activeParams.sort = value;
    this.activeParams.page = 1;
    this.updateUrl();
    this.applyFilters();
  }

  openPage(page: number): void {
    this.activeParams.page = page;
    this.updateUrl();
    this.applyFilters();
  }

  openNextPage(): void {
    if (this.activeParams.page && this.activeParams.page < this.totalPages) {
      this.activeParams.page++;
      this.updateUrl();
      this.applyFilters();
    }
  }

  openPrevPage(): void {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      this.updateUrl();
      this.applyFilters();
    }
  }

  toggleSorting(): void {
    this.sortingOpen = !this.sortingOpen;
  }

  toggleRoomFilter(room: number): void {
    const roomStr = room.toString();
    if (!this.activeParams.rooms) {
      this.activeParams.rooms = [roomStr];
    } else {
      const index = this.activeParams.rooms.indexOf(roomStr);
      if (index === -1) {
        this.activeParams.rooms.push(roomStr);
      } else {
        this.activeParams.rooms.splice(index, 1);
      }
    }
    this.activeParams.page = 1;
    this.updateUrl();
    this.applyFilters();
  }

  applyPriceFilter(): void {
    if (this.priceMin > 0) {
      this.activeParams.priceFrom = this.priceMin;
    } else {
      delete this.activeParams.priceFrom;
    }

    if (this.priceMax < 50000) {
      this.activeParams.priceTo = this.priceMax;
    } else {
      delete this.activeParams.priceTo;
    }

    this.activeParams.page = 1;
    this.updateUrl();
    this.applyFilters();
  }

  removeAppliedFilter(appliedFilter: AppliedFilterType): void {
    switch (appliedFilter.urlParam) {
      case 'price':
        delete this.activeParams.priceFrom;
        delete this.activeParams.priceTo;
        this.priceMin = 0;
        this.priceMax = 50000;
        break;
      case 'rooms':
        this.activeParams.rooms = [];
        break;
      case 'rentalTypes':
        this.activeParams.rentalTypes = [];
        break;
    }

    this.activeParams.page = 1;
    this.updateUrl();
    this.applyFilters();
  }

  updateUrl(): void {
    const queryParams: any = {};

    if (this.activeParams.page && this.activeParams.page > 1) {
      queryParams.page = this.activeParams.page;
    }

    if (this.activeParams.sort && this.activeParams.sort !== 'default') {
      queryParams.sort = this.activeParams.sort;
    }

    if (this.activeParams.priceFrom) {
      queryParams.priceFrom = this.activeParams.priceFrom;
    }

    if (this.activeParams.priceTo) {
      queryParams.priceTo = this.activeParams.priceTo;
    }

    if (this.activeParams.rooms && this.activeParams.rooms.length > 0) {
      queryParams.rooms = this.activeParams.rooms;
    }

    if (this.activeParams.rentalTypes && this.activeParams.rentalTypes.length > 0) {
      queryParams.rentalTypes = this.activeParams.rentalTypes;
    }

    this.router.navigate(['/catalog'], { queryParams });
  }

  isRentalTypeChecked(type: string): boolean {
    return this.activeParams.rentalTypes?.includes(type) || false;
  }

  toggleRentalTypeFilter(type: string): void {
    if (!this.activeParams.rentalTypes) {
      this.activeParams.rentalTypes = [];
    }

    const index = this.activeParams.rentalTypes.indexOf(type);
    if (index === -1) {
      this.activeParams.rentalTypes.push(type);
    } else {
      this.activeParams.rentalTypes.splice(index, 1);
    }

    if (this.activeParams.rentalTypes.length === 0) {
      delete this.activeParams.rentalTypes;
    }

    this.activeParams.page = 1;
    this.updateUrl();
    this.applyFilters();
  }

  @HostListener('document:click', ['$event'])
  click(event: Event): void {
    const target = event.target as HTMLElement;
    if (this.sortingOpen && !target.closest('.catalog-sorting')) {
      this.sortingOpen = false;
    }
  }
}
