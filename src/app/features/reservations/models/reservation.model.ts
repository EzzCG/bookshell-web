export interface ReservationClient {
  name: string;
  email: string;
  phone?: string;
}

export interface ReservationDetails {
  startDate: string;
  endDate: string;
  notes?: string;
}

export interface ReservationItem {
  bookName?: string;
  bookId: number | null;
  quantity: number;
  days: number;
  comment?: string;
}

export interface CreateReservationDto {
  client: ReservationClient;
  reservationDetails: ReservationDetails;
  items: ReservationItem[];
}
