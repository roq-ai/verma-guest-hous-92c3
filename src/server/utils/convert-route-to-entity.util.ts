const mapping: Record<string, string> = {
  bookings: 'booking',
  hotels: 'hotel',
  rooms: 'room',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
