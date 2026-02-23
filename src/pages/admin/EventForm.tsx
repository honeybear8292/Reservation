import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, Trash2, ChevronLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateId } from '../../utils/helpers';
import type { Event, TimeSlotDef } from '../../types';

function generateDateRange(start: string, end: string): string[] {
  if (!start || !end) return [];
  const dates: string[] = [];
  const cur = new Date(start);
  const last = new Date(end);
  while (cur <= last) {
    dates.push(cur.toISOString().split('T')[0]);
    cur.setDate(cur.getDate() + 1);
  }
  return dates;
}

const DEFAULT_SLOTS: TimeSlotDef[] = [
  { id: generateId(), time: '10:00', maxCapacity: 20 },
  { id: generateId(), time: '11:00', maxCapacity: 20 },
  { id: generateId(), time: '13:00', maxCapacity: 20 },
  { id: generateId(), time: '14:00', maxCapacity: 20 },
  { id: generateId(), time: '15:00', maxCapacity: 20 },
];

export default function EventForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getEventById, addEvent, updateEvent } = useApp();
  const isEdit = id !== undefined && id !== 'create';
  const existing = isEdit ? getEventById(id) : undefined;

  const [title, setTitle] = useState(existing?.title ?? '');
  const [description, setDescription] = useState(existing?.description ?? '');
  const [venue, setVenue] = useState(existing?.venue ?? '');
  const [address, setAddress] = useState(existing?.address ?? '');
  const [startDate, setStartDate] = useState(existing?.dates[0] ?? '');
  const [endDate, setEndDate] = useState(existing?.dates[existing?.dates.length - 1] ?? '');
  const [timeSlots, setTimeSlots] = useState<TimeSlotDef[]>(existing?.timeSlots ?? DEFAULT_SLOTS);
  const [status, setStatus] = useState<'active' | 'closed' | 'draft'>(existing?.status ?? 'active');

  const addSlot = () =>
    setTimeSlots(prev => [...prev, { id: generateId(), time: '10:00', maxCapacity: 20 }]);
  const removeSlot = (id: string) =>
    setTimeSlots(prev => prev.filter(t => t.id !== id));
  const updateSlot = (id: string, key: keyof TimeSlotDef, value: string | number) =>
    setTimeSlots(prev => prev.map(t => t.id === id ? { ...t, [key]: value } : t));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dates = generateDateRange(startDate, endDate);
    if (dates.length === 0) { alert('날짜 범위를 확인해주세요.'); return; }
    if (timeSlots.length === 0) { alert('시간대를 최소 1개 이상 추가해주세요.'); return; }

    const event: Event = {
      id: isEdit ? id : generateId(),
      title, description, venue, address,
      dates, timeSlots, status,
      createdAt: existing?.createdAt ?? new Date().toISOString(),
    };
    if (isEdit) { updateEvent(event); } else { addEvent(event); }
    navigate('/admin/events');
  };

  const inputCls = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#91ADC2]";
  const labelCls = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/admin/events')} className="p-1.5 rounded-lg hover:bg-gray-100">
          <ChevronLeft size={22} className="text-gray-600" />
        </button>
        <h2 className="font-bold text-gray-800 text-lg">{isEdit ? '행사 수정' : '새 행사 등록'}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* 기본 정보 */}
        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
          <h3 className="font-bold text-gray-700 text-sm border-b pb-2">기본 정보</h3>

          <div>
            <label className={labelCls}>행사명 <span className="text-red-400">*</span></label>
            <input className={inputCls} value={title} onChange={e => setTitle(e.target.value)}
              placeholder="예) 힐스테이트 판교역 입주박람회" required />
          </div>

          <div>
            <label className={labelCls}>행사 안내</label>
            <textarea className={inputCls} rows={4} value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="방문자에게 안내할 내용을 입력하세요&#10;(주차 안내, 준비물, 주의사항 등)" />
          </div>

          <div>
            <label className={labelCls}>장소명 <span className="text-red-400">*</span></label>
            <input className={inputCls} value={venue} onChange={e => setVenue(e.target.value)}
              placeholder="예) 힐스테이트 판교역 커뮤니티센터" required />
          </div>

          <div>
            <label className={labelCls}>주소</label>
            <input className={inputCls} value={address} onChange={e => setAddress(e.target.value)}
              placeholder="예) 경기도 성남시 분당구 판교역로 146" />
          </div>

          <div>
            <label className={labelCls}>상태</label>
            <select className={inputCls} value={status} onChange={e => setStatus(e.target.value as typeof status)}>
              <option value="active">예약 오픈</option>
              <option value="closed">예약 마감</option>
              <option value="draft">임시저장</option>
            </select>
          </div>
        </div>

        {/* 날짜 */}
        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
          <h3 className="font-bold text-gray-700 text-sm border-b pb-2">예약 기간</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>시작일 <span className="text-red-400">*</span></label>
              <input type="date" className={inputCls} value={startDate}
                onChange={e => setStartDate(e.target.value)} required />
            </div>
            <div>
              <label className={labelCls}>종료일 <span className="text-red-400">*</span></label>
              <input type="date" className={inputCls} value={endDate}
                onChange={e => setEndDate(e.target.value)} required />
            </div>
          </div>
          {startDate && endDate && (
            <p className="text-xs text-gray-400">
              총 {generateDateRange(startDate, endDate).length}일간 예약 운영
            </p>
          )}
        </div>

        {/* 시간대별 정원 */}
        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <div>
              <h3 className="font-bold text-gray-700 text-sm">시간대별 방문 정원</h3>
              <p className="text-xs text-gray-400 mt-0.5">각 시간대별로 최대 방문 가능 인원을 설정하세요</p>
            </div>
            <button
              type="button"
              onClick={addSlot}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg text-white font-semibold"
              style={{ backgroundColor: '#91ADC2' }}
            >
              <Plus size={13} /> 시간 추가
            </button>
          </div>

          <div className="space-y-2">
            {timeSlots.map((ts, idx) => (
              <div key={ts.id} className="flex gap-2 items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-xs text-gray-400 w-5 shrink-0 text-center">{idx + 1}</span>
                <div className="flex-1">
                  <label className="text-xs text-gray-500 mb-1 block">방문 시간</label>
                  <input
                    type="time"
                    value={ts.time}
                    onChange={e => updateSlot(ts.id, 'time', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#91ADC2]"
                  />
                </div>
                <div className="w-28 shrink-0">
                  <label className="text-xs text-gray-500 mb-1 block">최대 인원</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={1}
                      max={9999}
                      value={ts.maxCapacity}
                      onChange={e => updateSlot(ts.id, 'maxCapacity', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#91ADC2]"
                    />
                    <span className="text-xs text-gray-400 shrink-0">명</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeSlot(ts.id)}
                  disabled={timeSlots.length <= 1}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl text-sm" style={{ backgroundColor: '#91ADC211' }}>
            <p className="font-semibold text-gray-700 mb-1" style={{ color: '#91ADC2' }}>설정 요약</p>
            <p className="text-gray-600">
              하루 총 {timeSlots.length}개 시간대 운영 ·
              최대 {timeSlots.reduce((s, t) => s + t.maxCapacity, 0)}명/일 방문 가능
            </p>
          </div>
        </div>

        <div className="flex gap-3 pb-8">
          <button type="button" onClick={() => navigate('/admin/events')}
            className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700 hover:bg-gray-200">
            취소
          </button>
          <button type="submit"
            className="flex-1 py-3 rounded-xl font-bold text-white hover:opacity-90"
            style={{ backgroundColor: '#91ADC2' }}>
            {isEdit ? '수정 완료' : '행사 등록'}
          </button>
        </div>
      </form>
    </div>
  );
}
