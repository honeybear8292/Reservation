import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import StepIndicator from '../components/StepIndicator';
import QRTicket from '../components/QRTicket';
import { formatDate, generateId } from '../utils/helpers';
import { getSlotUsedCount } from '../utils/storage';
import type { Reservation } from '../types';

const STEPS = ['날짜 선택', '시간·인원', '예약자 정보', '예약 완료'];

interface CustomerForm {
  name: string;
  phone: string;
  email: string;
  agree: boolean;
}

export default function Reserve() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEventById, addReservation, reservations } = useApp();
  const event = getEventById(id ?? '');

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSlotId, setSelectedSlotId] = useState('');
  const [attendeeCount, setAttendeeCount] = useState(1);
  const [customer, setCustomer] = useState<CustomerForm>({ name: '', phone: '', email: '', agree: false });
  const [completed, setCompleted] = useState<Reservation | null>(null);

  if (!event) return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">행사를 찾을 수 없습니다.</div>
  );

  const getRemaining = (time: string, max: number) => {
    const used = getSlotUsedCount(reservations, event.id, selectedDate, time);
    return max - used;
  };

  const selectedSlot = event.timeSlots.find(ts => ts.id === selectedSlotId);
  const remaining = selectedSlot ? getRemaining(selectedSlot.time, selectedSlot.maxCapacity) : 0;

  const canNext = (() => {
    if (step === 1) return selectedDate !== '';
    if (step === 2) return selectedSlotId !== '' && attendeeCount > 0 && attendeeCount <= remaining;
    if (step === 3) return customer.name && customer.phone && customer.email && customer.agree;
    return false;
  })();

  const handleNext = () => {
    if (step === 3) {
      const reservation: Reservation = {
        id: generateId(),
        eventId: event.id,
        eventTitle: event.title,
        venue: event.venue,
        address: event.address,
        date: selectedDate,
        time: selectedTime,
        timeSlotId: selectedSlotId,
        attendeeCount,
        customer: { name: customer.name, phone: customer.phone, email: customer.email },
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };
      addReservation(reservation);
      setCompleted(reservation);
      setStep(4);
      return;
    }
    setStep(s => s + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => step > 1 && step < 4 ? setStep(s => s - 1) : navigate(`/events/${event.id}`)}
            className="p-1.5 rounded-lg hover:bg-gray-100"
          >
            <ChevronLeft size={22} className="text-gray-600" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-800 truncate text-sm">{event.title}</p>
            <p className="text-xs text-gray-400">{event.venue}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-6">
        <StepIndicator steps={STEPS} currentStep={step} />

        {/* Step 1: 날짜 선택 */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-bold text-gray-800 text-lg mb-5">방문 날짜를 선택하세요</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {event.dates.map(date => {
                const d = new Date(date + 'T00:00:00');
                const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
                const day = d.getDay();
                const isSun = day === 0;
                const isSat = day === 6;
                return (
                  <button
                    key={date}
                    onClick={() => { setSelectedDate(date); setSelectedSlotId(''); setSelectedTime(''); setAttendeeCount(1); }}
                    className={`p-2.5 rounded-xl border-2 text-center transition-all ${
                      selectedDate === date
                        ? 'text-white border-transparent'
                        : 'border-gray-200 hover:border-[#91ADC2] bg-white'
                    }`}
                    style={selectedDate === date ? { backgroundColor: '#91ADC2' } : {}}
                  >
                    <p className="text-xs font-medium">{d.getMonth() + 1}/{d.getDate()}</p>
                    <p className={`text-[11px] font-semibold ${
                      selectedDate === date ? 'text-white' : isSun ? 'text-red-500' : isSat ? 'text-blue-500' : 'text-gray-500'
                    }`}>
                      {dayNames[day]}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: 시간 및 인원 */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-bold text-gray-800 text-lg mb-1">시간대와 방문 인원을 선택하세요</h2>
            <p className="text-sm text-gray-400 mb-5">{formatDate(selectedDate)}</p>

            <h3 className="text-sm font-semibold text-gray-600 mb-3">방문 시간</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-7">
              {event.timeSlots.map(ts => {
                const remain = getRemaining(ts.time, ts.maxCapacity);
                const isFull = remain <= 0;
                const isSelected = selectedSlotId === ts.id;
                const pct = ((ts.maxCapacity - remain) / ts.maxCapacity) * 100;

                return (
                  <button
                    key={ts.id}
                    onClick={() => {
                      if (!isFull) {
                        setSelectedSlotId(ts.id);
                        setSelectedTime(ts.time);
                        setAttendeeCount(Math.min(attendeeCount, remain));
                      }
                    }}
                    disabled={isFull}
                    className={`p-3.5 rounded-xl border-2 text-left transition-all ${
                      isSelected ? 'border-transparent text-white' :
                      isFull ? 'border-gray-100 bg-gray-50 cursor-not-allowed' :
                      'border-gray-200 hover:border-[#91ADC2]'
                    }`}
                    style={isSelected ? { backgroundColor: '#91ADC2' } : {}}
                  >
                    <p className={`font-bold text-base ${isFull && !isSelected ? 'text-gray-300' : ''}`}>
                      {ts.time}
                    </p>
                    <p className={`text-xs mt-0.5 ${isSelected ? 'text-white/80' : isFull ? 'text-red-400' : remain <= 5 ? 'text-orange-500' : 'text-green-600'}`}>
                      {isFull ? '마감' : `잔여 ${remain}명`}
                    </p>
                    <div className={`mt-2 h-1 rounded-full ${isSelected ? 'bg-white/30' : 'bg-gray-100'}`}>
                      <div
                        className={`h-1 rounded-full ${isSelected ? 'bg-white/70' : pct >= 100 ? 'bg-red-400' : pct >= 80 ? 'bg-orange-400' : 'bg-[#91ADC2]'}`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedSlotId && (
              <>
                <h3 className="text-sm font-semibold text-gray-600 mb-3">방문 인원</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-2">
                    <button
                      onClick={() => setAttendeeCount(prev => Math.max(1, prev - 1))}
                      className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-bold w-6 text-center text-lg">{attendeeCount}</span>
                    <button
                      onClick={() => setAttendeeCount(prev => Math.min(remaining, prev + 1))}
                      className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">명 (최대 {remaining}명)</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">* 본인 포함 총 방문 인원을 입력해 주세요</p>
              </>
            )}
          </div>
        )}

        {/* Step 3: 예약자 정보 */}
        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-bold text-gray-800 text-lg mb-1">예약자 정보를 입력하세요</h2>
            <div className="text-sm text-gray-400 mb-5 p-3 rounded-xl bg-gray-50">
              {formatDate(selectedDate)} · {selectedTime} · {attendeeCount}명 방문
            </div>

            <div className="space-y-4">
              {([
                { label: '이름', key: 'name' as const, type: 'text', placeholder: '홍길동' },
                { label: '휴대폰 번호', key: 'phone' as const, type: 'tel', placeholder: '01012345678 (- 없이 입력)' },
                { label: '이메일', key: 'email' as const, type: 'email', placeholder: 'example@email.com' },
              ]).map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {label} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={customer[key]}
                    onChange={e => setCustomer(prev => ({ ...prev, [key]: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#91ADC2] text-sm"
                  />
                </div>
              ))}

              <label className="flex items-start gap-2.5 cursor-pointer mt-2">
                <input
                  type="checkbox"
                  checked={customer.agree}
                  onChange={e => setCustomer(prev => ({ ...prev, agree: e.target.checked }))}
                  className="mt-0.5 accent-[#91ADC2]"
                />
                <span className="text-sm text-gray-600">
                  개인정보 수집 및 이용에 동의합니다. <span className="text-red-400">*</span><br />
                  <span className="text-xs text-gray-400">수집 항목: 이름, 연락처, 이메일 / 목적: 방문 예약 확인 / 보유: 행사 종료 후 1개월</span>
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Step 4: 완료 */}
        {step === 4 && completed && (
          <div>
            <div className="text-center mb-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl"
                style={{ backgroundColor: '#91ADC2' }}
              >
                ✓
              </div>
              <h2 className="text-2xl font-extrabold text-gray-800">예약이 완료되었습니다!</h2>
              <p className="text-gray-500 mt-1 text-sm">아래 QR 티켓을 캡처하거나 저장해 두세요</p>
            </div>
            <QRTicket reservation={completed} />
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate('/my-tickets')}
                className="flex-1 py-3.5 rounded-xl font-bold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#91ADC2' }}
              >
                내 예약 보기
              </button>
              <button
                onClick={() => navigate('/events')}
                className="flex-1 py-3.5 rounded-xl font-bold bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                목록으로
              </button>
            </div>
          </div>
        )}

        {/* Next button */}
        {step < 4 && (
          <div className="mt-6">
            <button
              onClick={handleNext}
              disabled={!canNext}
              className="w-full py-4 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed"
              style={{ backgroundColor: canNext ? '#91ADC2' : undefined }}
            >
              {step === 3 ? '예약 완료하기' : '다음'}
              {step < 3 && <ChevronRight size={20} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
