import { BookingInterface } from 'interfaces/booking';
import { HotelInterface } from 'interfaces/hotel';
import { GetQueryInterface } from 'interfaces';

export interface RoomInterface {
  id?: string;
  hotel_id?: string;
  status: string;
  type: string;
  created_at?: any;
  updated_at?: any;
  booking?: BookingInterface[];
  hotel?: HotelInterface;
  _count?: {
    booking?: number;
  };
}

export interface RoomGetQueryInterface extends GetQueryInterface {
  id?: string;
  hotel_id?: string;
  status?: string;
  type?: string;
}
