import type { Event, Reservation } from '../types';

const EVENTS_KEY = 'rv_events';
const RESERVATIONS_KEY = 'rv_reservations';
const ADMIN_AUTH_KEY = 'rv_admin_auth';

export const getEvents = (): Event[] => {
  try { return JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]'); } catch { return []; }
};
export const saveEvents = (events: Event[]) =>
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));

export const getReservations = (): Reservation[] => {
  try { return JSON.parse(localStorage.getItem(RESERVATIONS_KEY) || '[]'); } catch { return []; }
};
export const saveReservations = (reservations: Reservation[]) =>
  localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(reservations));

/** 특정 이벤트·날짜·시간대의 확정 예약 인원 합계 */
export const getSlotUsedCount = (
  reservations: Reservation[],
  eventId: string,
  date: string,
  time: string
): number =>
  reservations
    .filter(r => r.eventId === eventId && r.date === date && r.time === time && r.status === 'confirmed')
    .reduce((sum, r) => sum + r.attendeeCount, 0);

export const isAdminLoggedIn = (): boolean =>
  localStorage.getItem(ADMIN_AUTH_KEY) === 'true';

export const adminLogin = (username: string, password: string): boolean => {
  if (username === 'admin' && password === 'admin123') {
    localStorage.setItem(ADMIN_AUTH_KEY, 'true');
    return true;
  }
  return false;
};

export const adminLogout = () => localStorage.removeItem(ADMIN_AUTH_KEY);
