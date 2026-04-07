import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveParamsType } from "../../../../types/active-params.type";
import { ActiveParamsUtil } from "../../utils/active-params.util";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'category-filter',
  standalone: true,
  templateUrl: './filter.html',
  imports: [
    FormsModule,
    CommonModule
  ],
  styleUrl: './filter.css'
})
export class Filter implements OnInit {
  @Input() filterType: 'rooms' | 'price' | 'rentalType' = 'rooms';
  @Input() filterTitle: string = '';
  @Input() options?: { value: string | number; label: string }[];

  open = false;
  activeParams: ActiveParamsType = { rooms: [] };
  from: number | null = null;
  to: number | null = null;
  selectedRooms: string[] = [];

  selectedRentalTypes: string[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.activeParams = ActiveParamsUtil.processParams(params);

      switch (this.filterType) {
        case 'rooms':
          this.selectedRooms = this.activeParams.rooms || [];
          this.open = this.selectedRooms.length > 0;
          break;

        case 'price':
          this.from = this.activeParams.priceFrom || null;
          this.to = this.activeParams.priceTo || null;
          this.open = !!(this.from || this.to);
          break;

        case 'rentalType':
          this.selectedRentalTypes = this.activeParams.rentalTypes || [];
          this.open = this.selectedRentalTypes.length > 0;
          break;
      }
    });
  }

  get title(): string {
    if (this.filterTitle) {
      return this.filterTitle;
    }

    switch (this.filterType) {
      case 'rooms':
        return 'Количество комнат';
      case 'price':
        return 'Цена за сутки';
      case 'rentalType':
        return 'Тип аренды';
      default:
        return '';
    }
  }

  toggle(): void {
    this.open = !this.open;
  }

  updateRoomsFilter(roomValue: string, checked: boolean): void {
    if (!this.activeParams.rooms) {
      this.activeParams.rooms = [];
    }

    if (checked) {
      if (!this.activeParams.rooms.includes(roomValue)) {
        this.activeParams.rooms = [...this.activeParams.rooms, roomValue];
      }
    } else {
      this.activeParams.rooms = this.activeParams.rooms.filter(r => r !== roomValue);
    }

    if (this.activeParams.rooms.length === 0) {
      delete this.activeParams.rooms;
    }

    this.activeParams.page = 1;
    this.updateUrl();
  }

  updateRentalTypeFilter(typeValue: string, checked: boolean): void {
    if (!this.activeParams.rentalTypes) {
      this.activeParams.rentalTypes = [];
    }

    if (checked) {
      if (!this.activeParams.rentalTypes.includes(typeValue)) {
        this.activeParams.rentalTypes = [...this.activeParams.rentalTypes, typeValue];
      }
    } else {
      this.activeParams.rentalTypes = this.activeParams.rentalTypes.filter(t => t !== typeValue);
    }

    if (this.activeParams.rentalTypes.length === 0) {
      delete this.activeParams.rentalTypes;
    }

    this.activeParams.page = 1;
    this.updateUrl();
  }

  updateRangeFilter(param: 'from' | 'to', value: string): void {
    const numValue = value ? parseInt(value, 10) : null;

    switch (this.filterType) {
      case 'price':
        if (param === 'from') {
          this.activeParams.priceFrom = numValue || undefined;
          this.from = numValue;
        } else {
          this.activeParams.priceTo = numValue || undefined;
          this.to = numValue;
        }
        if (!this.activeParams.priceFrom) {
          delete this.activeParams.priceFrom;
        }
        if (!this.activeParams.priceTo) {
          delete this.activeParams.priceTo;
        }
        break;
    }

    this.activeParams.page = 1;
    this.updateUrl();
  }

  isRoomChecked(roomValue: string): boolean {
    return this.activeParams.rooms?.includes(roomValue) || false;
  }

  isRentalTypeChecked(typeValue: string): boolean {
    return this.activeParams.rentalTypes?.includes(typeValue) || false;
  }

  private updateUrl(): void {
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
}
