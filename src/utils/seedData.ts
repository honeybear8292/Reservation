import type { Event } from '../types';
import { generateId } from './helpers';

const today = new Date('2026-02-23');
const d = (offset: number) => {
  const dt = new Date(today);
  dt.setDate(dt.getDate() + offset);
  return dt.toISOString().split('T')[0];
};
const dateRange = (start: number, end: number) => {
  const dates: string[] = [];
  for (let i = start; i <= end; i++) dates.push(d(i));
  return dates;
};

export const SEED_EVENTS: Event[] = [
  {
    id: generateId(),
    title: '힐스테이트 판교역 입주박람회',
    description:
      '힐스테이트 판교역 아파트 입주민을 위한 박람회입니다.\n인테리어, 가구, 가전, 이사 서비스 등 40여 개 업체가 참여하며 입주민 전용 특별 혜택을 제공합니다.\n\n※ 시간대별 입장 인원이 제한되오니 반드시 사전 예약 후 방문해 주시기 바랍니다.',
    venue: '힐스테이트 판교역 커뮤니티센터',
    address: '경기도 성남시 분당구 판교역로 146',
    dates: dateRange(3, 10),
    timeSlots: [
      { id: 't1', time: '10:00', maxCapacity: 30 },
      { id: 't2', time: '10:30', maxCapacity: 30 },
      { id: 't3', time: '11:00', maxCapacity: 30 },
      { id: 't4', time: '11:30', maxCapacity: 30 },
      { id: 't5', time: '13:00', maxCapacity: 30 },
      { id: 't6', time: '13:30', maxCapacity: 30 },
      { id: 't7', time: '14:00', maxCapacity: 30 },
      { id: 't8', time: '14:30', maxCapacity: 30 },
      { id: 't9', time: '15:00', maxCapacity: 30 },
      { id: 't10', time: '15:30', maxCapacity: 30 },
    ],
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: '래미안 원베일리 분양사무소 방문 예약',
    description:
      '래미안 원베일리 분양사무소 방문 예약입니다.\n전담 상담사가 단지 정보, 평형별 안내, 청약 일정 등을 상세히 설명해 드립니다.\n\n• 주차는 방문자 주차장 이용 가능 (2시간 무료)\n• 방문 시 신분증 지참 필수\n※ 예약 시간 10분 전까지 도착 부탁드립니다.',
    venue: '래미안 원베일리 분양사무소',
    address: '서울특별시 서초구 반포대로 301',
    dates: dateRange(1, 21),
    timeSlots: [
      { id: 't1', time: '10:00', maxCapacity: 10 },
      { id: 't2', time: '11:00', maxCapacity: 10 },
      { id: 't3', time: '13:00', maxCapacity: 10 },
      { id: 't4', time: '14:00', maxCapacity: 10 },
      { id: 't5', time: '15:00', maxCapacity: 10 },
      { id: 't6', time: '16:00', maxCapacity: 10 },
    ],
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: '자이 더 파크 모델하우스 관람',
    description:
      '자이 더 파크 신규 분양 모델하우스 관람 예약입니다.\n84㎡ ~ 134㎡ 다양한 평형의 모델하우스를 직접 체험하실 수 있습니다.\n\n• 관람 소요시간: 약 40~60분\n• 어린이 동반 가능\n• 주차 무료 제공',
    venue: '자이 더 파크 홍보관',
    address: '경기도 수원시 영통구 광교중앙로 182',
    dates: [d(7), d(8), d(14), d(15), d(21), d(22)],
    timeSlots: [
      { id: 't1', time: '10:00', maxCapacity: 15 },
      { id: 't2', time: '11:00', maxCapacity: 15 },
      { id: 't3', time: '12:00', maxCapacity: 15 },
      { id: 't4', time: '13:00', maxCapacity: 15 },
      { id: 't5', time: '14:00', maxCapacity: 15 },
      { id: 't6', time: '15:00', maxCapacity: 15 },
      { id: 't7', time: '16:00', maxCapacity: 15 },
    ],
    status: 'active',
    createdAt: new Date().toISOString(),
  },
];
