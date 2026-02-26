export type ReservationStatus = 'confirmed' | 'cancelled';
export type CustomFieldType = 'text' | 'tel' | 'number' | 'email' | 'select';

export interface CustomField {
  id: string;
  key: string;         // 저장 키 (영문, 예: 'unitNumber')
  label: string;       // 표시 레이블 (예: '동호수')
  type: CustomFieldType;
  placeholder?: string;
  options?: string[];  // type='select'일 때 선택지
  required: boolean;
}

export interface TimeSlotDef {
  id: string;
  time: string;
}

export interface Event {
  id: string;
  slug: string;                  // 고유 URL 슬러그 (예: 'abc123de')
  shareDomain?: string;          // 행사별 공유 도메인 (예: 'https://example.com')
  imageUrl?: string;             // 행사 배너 이미지 URL
  title: string;
  description: string;
  venue: string;
  address: string;
  dates: string[];
  startTime?: string;
  endTime?: string;
  timeSlots: TimeSlotDef[];
  customFields: CustomField[];   // 행사별 커스텀 수집 필드
  vendorCategories?: VendorCategory[];
  vendors?: Vendor[];
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
  extraFields: Record<string, string>;  // 커스텀 필드 값 (key → value)
  status: ReservationStatus;
  checkedIn: boolean;
  checkedInAt?: string;
  createdAt: string;
}

export interface VendorCategory {
  id: string;
  name: string; // 예: "가구", "방충망", "입주청소"
}

export interface Vendor {
  id: string;
  categoryId: string;
  name: string;
  imageUrl?: string;
}

export interface CompanyInfo {
  name: string;
  address: string;
  email: string;
}
