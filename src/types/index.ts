export type ReservationStatus = 'confirmed' | 'cancelled';

export interface TimeSlotDef {
  id: string;
  time: string;
  maxCapacity: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  venue: string;
  address: string;
  dates: string[];
  timeSlots: TimeSlotDef[];
  status: 'active' | 'closed' | 'draft';
  createdAt: string;
}

export interface Customer {
  name: string;
  phone: string;
  email: string;
}

export interface Reservation {
  id: string;
  eventId: string;
  eventTitle: string;
  venue: string;
  address: string;
  date: string;
  time: string;
  timeSlotId: string;
  attendeeCount: number;
  customer: Customer;
  status: ReservationStatus;
  createdAt: string;
}
