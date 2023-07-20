import { RoomInterface } from 'interfaces/room';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface HotelInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  room?: RoomInterface[];
  user?: UserInterface;
  _count?: {
    room?: number;
  };
}

export interface HotelGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
