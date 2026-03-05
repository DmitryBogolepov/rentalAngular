import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartCard } from './apart-card';

describe('ApartCard', () => {
  let component: ApartCard;
  let fixture: ComponentFixture<ApartCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApartCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApartCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
