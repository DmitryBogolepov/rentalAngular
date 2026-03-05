// services/apartment.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Apartment} from '../../../types/apartment.type';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  private apartments: Apartment[] = [
    {
      id: 1,
      name: 'Уютная студия в центре',
      address: 'Краснодарский край, г.о. Сочи, с. Эстосадок, Автомобильный пер., 10\nр-н Адлерский',
      rooms: 1,
      area: 50,
      price: 8000,
      floor: 5,
      isPopular: true,
      isLongTerm: false,
      images: [
        "assets/img/apart.jpg",
        "assets/img/apart2.jpg",
        "assets/img/apart3.png",
        "assets/img/apart4.jpg"
      ],
      description: 'Прекрасная студия с современным ремонтом, полностью укомплектованная всем необходимым для комфортного проживания. В квартире есть всё необходимое: кондиционер, холодильник, плита, микроволновка, стиральная машина, телевизор, фен, утюг. Для вашего комфорта предоставляется постельное белье, полотенца и средства гигиены. Из окон открывается вид на улицу, есть лоджия.',
      amenities: [
        'Wi-Fi',
        'Телевидение',
        'Кондиционер',
        'Холодильник',
        'Плита',
        'Микроволновка',
        'Стиральная машина',
        'Телевизор',
        'Фен',
        'Утюг',
        'Постельное белье',
        'Полотенца',
        'Средства гигиены',
        'Лоджия'
      ],
      rules: {
        checkInAfter: '14:00',
        checkOutBefore: '12:00',
        maxGuests: 4,
        contactlessCheckIn: true,
        childrenAllowed: true,
        petsAllowed: true,
        smokingAllowed: false,
        partiesAllowed: false,
        documentsProvided: false,
        beds: '1 особо широкая, 1 диван-кровать',
        view: 'На улицу',
        monthlyRent: false
      },
      deposit: 10000
    },
    {
      id: 2,
      name: 'Студия в центре Эстосадока',
      address: 'Краснодарский край, г.о. Сочи, с. Эстосадок, Автомобильный пер., 10\nр-н Адлерский',
      rooms: 1,
      area: 30,
      price: 5000,
      floor: 3,
      isPopular: false,
      isLongTerm: false,
      images: [
        "assets/img/apart.jpg",
        "assets/img/apart2.jpg",
        "assets/img/apart3.png",
        "assets/img/apart4.jpg"
      ],
      description: 'Уютная студия с современным ремонтом, полностью укомплектованная всем необходимым для комфортного проживания. В квартире есть кондиционер, холодильник, плита, микроволновка, стиральная машина, телевизор, фен, утюг. Для вашего комфорта предоставляется постельное белье, полотенца и средства гигиены.',
      amenities: [
        'Wi-Fi',
        'Телевидение',
        'Кондиционер',
        'Холодильник',
        'Плита',
        'Микроволновка',
        'Стиральная машина',
        'Телевизор',
        'Фен',
        'Утюг',
        'Постельное белье',
        'Полотенца',
        'Средства гигиены'
      ],
      rules: {
        checkInAfter: '14:00',
        checkOutBefore: '12:00',
        maxGuests: 3,
        contactlessCheckIn: true,
        childrenAllowed: true,
        petsAllowed: false,
        smokingAllowed: false,
        partiesAllowed: false,
        documentsProvided: false,
        beds: '1 двуспальная, 1 односпальная',
        monthlyRent: false,
        totalFloors: 7
      },
      deposit: 5000
    },
    {
      id: 3,
      name: 'Однокомнатная квартира',
      address: 'Краснодарский край, Сочи, Весёлая ул., 82/1\nр-н Адлерский',
      rooms: 1,
      area: 47.3,
      price: 5000,
      floor: 3,
      isPopular: false,
      isLongTerm: false,
      images: [
        "assets/img/apart.jpg",
        "assets/img/apart2.jpg",
        "assets/img/apart3.png",
        "assets/img/apart4.jpg"
      ],
      description: 'Уютная однокомнатная квартира с балконом. Полностью укомплектована всем необходимым для комфортного проживания: кондиционер, холодильник, плита, микроволновка, стиральная машина, водонагреватель, телевизор, фен, утюг. Для вашего комфорта предоставляется постельное белье, полотенца и средства гигиены. Возможна помесячная аренда.',
      amenities: [
        'Wi-Fi',
        'Телевидение',
        'Кондиционер',
        'Холодильник',
        'Плита',
        'Микроволновка',
        'Стиральная машина',
        'Водонагреватель',
        'Телевизор',
        'Фен',
        'Утюг',
        'Постельное белье',
        'Полотенца',
        'Средства гигиены',
        'Балкон'
      ],
      rules: {
        checkInAfter: '14:00',
        checkOutBefore: '12:00',
        maxGuests: 2,
        contactlessCheckIn: true,
        childrenAllowed: true,
        petsAllowed: false,
        smokingAllowed: false,
        partiesAllowed: false,
        documentsProvided: false,
        beds: '1 двуспальная, 1 диван-кровать',
        monthlyRent: true,
        totalFloors: 6,
        balcony: 'балкон'
      },
      deposit: 10000
    },
    {
      id: 4,
      name: 'Однокомнатная квартира',
      address: 'Краснодарский край, Сочи, Весёлая ул., 82/1\nр-н Адлерский',
      rooms: 1,
      area: 52.1,
      price: 5000,
      floor: 3,
      isPopular: false,
      isLongTerm: true,
      images: [
        "assets/img/apart.jpg",
        "assets/img/apart2.jpg",
        "assets/img/apart3.png",
        "assets/img/apart4.jpg"
      ],
      description: 'Просторная однокомнатная квартира с балконом. Полностью укомплектована всем необходимым для комфортного проживания: кондиционер, холодильник, плита, микроволновка, стиральная машина, водонагреватель, телевизор, фен, утюг. Для вашего комфорта предоставляется постельное белье, полотенца и средства гигиены. Возможна помесячная аренда.',
      amenities: [
        'Wi-Fi',
        'Телевидение',
        'Кондиционер',
        'Холодильник',
        'Плита',
        'Микроволновка',
        'Стиральная машина',
        'Водонагреватель',
        'Телевизор',
        'Фен',
        'Утюг',
        'Постельное белье',
        'Полотенца',
        'Средства гигиены',
        'Балкон'
      ],
      rules: {
        checkInAfter: '14:00',
        checkOutBefore: '12:00',
        maxGuests: 2,
        contactlessCheckIn: true,
        childrenAllowed: true,
        petsAllowed: false,
        smokingAllowed: false,
        partiesAllowed: false,
        documentsProvided: false,
        beds: '1 двуспальная, 1 диван-кровать',
        monthlyRent: true,
        totalFloors: 6,
        balcony: 'балкон'
      },
      deposit: 10000
    },
    {
      id: 5,
      name: 'Однокомнатная квартира',
      address: 'Краснодарский край, г.о. Сочи, с. Эстосадок, Эстонская ул., 119\nр-н Адлерский',
      rooms: 1,
      area: 66,
      price: 5000,
      floor: 2,
      isPopular: false,
      isLongTerm: false,
      images: [
        "assets/img/apart.jpg",
        "assets/img/apart2.jpg",
        "assets/img/apart3.png",
        "assets/img/apart4.jpg"
      ],
      description: 'Просторная однокомнатная квартира с балконом. В наличии вся необходимая техника: кондиционер, холодильник, плита, микроволновка, стиральная машина, посудомоечная машина, телевизор, фен, утюг. Для гостей предоставляется постельное белье, полотенца и средства гигиены.',
      amenities: [
        'Wi-Fi',
        'Телевидение',
        'Кондиционер',
        'Холодильник',
        'Плита',
        'Микроволновка',
        'Стиральная машина',
        'Посудомоечная машина',
        'Телевизор',
        'Фен',
        'Утюг',
        'Постельное белье',
        'Полотенца',
        'Средства гигиены',
        'Балкон'
      ],
      rules: {
        checkInAfter: '14:00',
        checkOutBefore: '12:00',
        maxGuests: 5,
        contactlessCheckIn: true,
        childrenAllowed: true,
        petsAllowed: true,
        smokingAllowed: false,
        partiesAllowed: false,
        documentsProvided: false,
        beds: '1 двуспальная, 1 диван-кровать, 1 односпальная',
        monthlyRent: false,
        totalFloors: 5,
        balcony: 'балкон'
      },
      deposit: 5000
    },
    {
      id: 6,
      name: 'Однокомнатная квартира',
      address: 'Краснодарский край, г.о. Сочи, пгт. Красная Поляна, ул. Турчинского, 19А\nр-н Адлерский',
      rooms: 1,
      area: 34,
      price: 5000,
      floor: 2,
      isPopular: false,
      isLongTerm: false,
      images: [
        "assets/img/apart.jpg",
        "assets/img/apart2.jpg",
        "assets/img/apart3.png",
        "assets/img/apart4.jpg"
      ],
      description: 'Однокомнатная квартира с видом во двор. В наличии вся необходимая техника: кондиционер, холодильник, плита, микроволновка, стиральная машина, посудомоечная машина, телевизор, фен, утюг. Для гостей предоставляется постельное белье, полотенца и средства гигиены.',
      amenities: [
        'Wi-Fi',
        'Телевидение',
        'Кондиционер',
        'Холодильник',
        'Плита',
        'Микроволновка',
        'Стиральная машина',
        'Посудомоечная машина',
        'Телевизор',
        'Фен',
        'Утюг',
        'Постельное белье',
        'Полотенца',
        'Средства гигиены'
      ],
      rules: {
        checkInAfter: '14:00',
        checkOutBefore: '12:00',
        maxGuests: 4,
        contactlessCheckIn: true,
        childrenAllowed: true,
        petsAllowed: true,
        smokingAllowed: false,
        partiesAllowed: false,
        documentsProvided: false,
        beds: '1 двуспальная, 1 диван-кровать',
        monthlyRent: false,
        totalFloors: 6,
        view: 'Во двор'
      },
      deposit: 5000
    },
    {
      id: 7,
      name: 'Трёхкомнатная квартира',
      address: 'Краснодарский край, г.о. Сочи, пгт. Красная Поляна, Ставропольская ул., 20\nр-н Адлерский',
      rooms: 3,
      area: 60,
      price: 5500,
      floor: 5,
      isPopular: false,
      isLongTerm: true,
      images: [
        "assets/img/apart.jpg",
        "assets/img/apart2.jpg",
        "assets/img/apart3.png",
        "assets/img/apart4.jpg"
      ],
      description: 'Трёхкомнатная квартира с балконом и лоджией. В наличии техника: холодильник, плита, телевизор, фен, утюг. Для гостей предоставляется постельное белье, полотенца и средства гигиены. Возможна помесячная аренда.',
      amenities: [
        'Wi-Fi',
        'Телевидение',
        'Холодильник',
        'Плита',
        'Телевизор',
        'Фен',
        'Утюг',
        'Постельное белье',
        'Полотенца',
        'Средства гигиены',
        'Балкон',
        'Лоджия'
      ],
      rules: {
        checkInAfter: '00:00',
        checkOutBefore: '00:00',
        maxGuests: 4,
        contactlessCheckIn: false,
        childrenAllowed: true,
        petsAllowed: false,
        smokingAllowed: false,
        partiesAllowed: false,
        documentsProvided: false,
        beds: '2 двуспальных',
        monthlyRent: true,
        totalFloors: 5,
        balcony: 'балкон, лоджия',
        view: 'На улицу, Во двор'
      },
      deposit: 5000
    },
    {
      id: 8,
      name: 'Студия',
      address: 'Краснодарский край, г.о. Сочи, с. Эсто-Садок, Берёзовая ул., 126\nр-н Адлерский',
      rooms: 0,
      area: 33,
      price: 8000,
      floor: 2,
      isPopular: false,
      isLongTerm: true,
      images: [
        "assets/img/apart.jpg",
        "assets/img/apart2.jpg",
        "assets/img/apart3.png",
        "assets/img/apart4.jpg"
      ],
      description: 'Студия с видом на улицу и во двор. В наличии техника: кондиционер, холодильник, плита, микроволновка, стиральная машина, телевизор, фен, утюг. Для гостей предоставляется постельное белье, полотенца и средства гигиены. Возможна помесячная аренда.',
      amenities: [
        'Wi-Fi',
        'Телевидение',
        'Кондиционер',
        'Холодильник',
        'Плита',
        'Микроволновка',
        'Стиральная машина',
        'Телевизор',
        'Фен',
        'Утюг',
        'Постельное белье',
        'Полотенца',
        'Средства гигиены'
      ],
      rules: {
        checkInAfter: '14:00',
        checkOutBefore: '12:00',
        maxGuests: 4,
        contactlessCheckIn: false,
        childrenAllowed: true,
        petsAllowed: false,
        smokingAllowed: false,
        partiesAllowed: false,
        documentsProvided: false,
        beds: '1 двуспальная, 1 диван-кровать',
        monthlyRent: true,
        totalFloors: 6,
        view: 'На улицу, Во двор'
      },
      deposit: 0
    }
    ,
    {
      id: 9,
      name: 'Двухкомнатная квартира',
      address: 'Краснодарский край, г.о. Сочи, пгт. Красная Поляна, Заповедная ул., 32\nр-н Адлерский',
      rooms: 2,
      area: 64,
      price: 15000,
      floor: 1,
      isPopular: false,
      isLongTerm: true,
      images: [
        "assets/img/apart.jpg",
        "assets/img/apart2.jpg",
        "assets/img/apart3.png",
        "assets/img/apart4.jpg"
      ],
      description: 'Двухкомнатная квартира на первом этаже с видом на улицу и во двор. Полностью укомплектована техникой: кондиционер, холодильник, плита, микроволновка, стиральная машина, посудомоечная машина, водонагреватель, телевизор, фен, утюг. Для гостей предоставляется постельное белье и полотенца. Возможна помесячная аренда.',
      amenities: [
        'Wi-Fi',
        'Телевидение',
        'Кондиционер',
        'Холодильник',
        'Плита',
        'Микроволновка',
        'Стиральная машина',
        'Посудомоечная машина',
        'Водонагреватель',
        'Телевизор',
        'Фен',
        'Утюг',
        'Постельное белье',
        'Полотенца'
      ],
      rules: {
        checkInAfter: '15:00',
        checkOutBefore: '12:00',
        maxGuests: 5,
        contactlessCheckIn: true,
        childrenAllowed: true,
        petsAllowed: false,
        smokingAllowed: false,
        partiesAllowed: false,
        documentsProvided: false,
        beds: '1 особо широкая, 2 односпальных, 1 диван-кровать, 1 двуспальная',
        monthlyRent: true,
        totalFloors: 5,
        view: 'На улицу, Во двор'
      },
      deposit: 10000
    }
  ];
  getApartments(): Observable<Apartment[]> {
    return of(this.apartments);
  }
  getPopularApartments(): Observable<Apartment[]> {
    const popular = this.apartments.filter(apt => apt.isPopular);
    return of(popular);
  }
  getApartmentById(id: string): Observable<Apartment | undefined> {
    const apartment = this.apartments.find(apt => apt.id === Number(id));
    return of(apartment);
  }
}
