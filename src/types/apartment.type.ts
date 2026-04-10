export interface Apartment {
  id: number;
  name: string;
  address: string;
  rooms: number;
  area: number;
  price: number;
  monthPrice?:number;
  images: string[];
  isPopular?: boolean;
  description?: string;
  amenities?: string[];
  isShortTerm:boolean;
  isLongTerm: boolean;
  floor:number,
  rules?: {
    checkInAfter: string;
    checkOutBefore: string;
    maxGuests: number;
    contactlessCheckIn: boolean;
    childrenAllowed: boolean;
    petsAllowed: boolean;
    smokingAllowed: boolean;
    partiesAllowed: boolean;
    documentsProvided: boolean;
    [key: string]: any;
  };
  deposit?: number;
}
