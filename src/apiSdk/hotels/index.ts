import axios from 'axios';
import queryString from 'query-string';
import { HotelInterface, HotelGetQueryInterface } from 'interfaces/hotel';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getHotels = async (query?: HotelGetQueryInterface): Promise<PaginatedInterface<HotelInterface>> => {
  const response = await axios.get('/api/hotels', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createHotel = async (hotel: HotelInterface) => {
  const response = await axios.post('/api/hotels', hotel);
  return response.data;
};

export const updateHotelById = async (id: string, hotel: HotelInterface) => {
  const response = await axios.put(`/api/hotels/${id}`, hotel);
  return response.data;
};

export const getHotelById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/hotels/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteHotelById = async (id: string) => {
  const response = await axios.delete(`/api/hotels/${id}`);
  return response.data;
};
