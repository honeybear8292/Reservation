import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import type { Reservation } from '../types';
import { formatDate } from '../utils/helpers';

interface Props {
  reservation: Reservation;
  compact?: boolean;
}

export default function QRTicket({ reservation: r, compact = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, r.id, {
        width: compact ? 80 : 160,
        margin: 2,
        color: { dark: '#2c3e50', light: '#ffffff' },
      });
    }
  }, [r.id, compact]);

  if (compact) {
    return (
      <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-3 flex items-center gap-3">
        <canvas ref={canvasRef} className="rounded shrink-0" />
        <div className="min-w-0">
          <p className="font-bold text-gray-800 text-sm truncate">{r.eventTitle}</p>
          <p className="text-xs text-gray-500">{formatDate(r.date)} {r.time}</p>
          <p className="text-xs text-gray-500">{r.venue}</p>
          <p className="text-xs font-semibold mt-1" style={{ color: '#91ADC2' }}>
            {r.customer.name} · {r.attendeeCount}명
          </p>
          <span className={`inline-block text-[10px] px-1.5 py-0.5 rounded-full mt-1 font-semibold ${
            r.status === 'confirmed' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
          }`}>
            {r.status === 'confirmed' ? '예약확정' : '취소됨'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-sm mx-auto">
      {/* Header */}
      <div className="text-white text-center py-4 px-6" style={{ backgroundColor: '#91ADC2' }}>
        <p className="text-xs uppercase tracking-widest opacity-80 mb-1">ReserveTicket</p>
        <h2 className="font-bold text-lg leading-tight">{r.eventTitle}</h2>
      </div>

      {/* QR */}
      <div className="p-6">
        <div className="flex justify-center mb-5">
          <div className="p-3 rounded-2xl border-2 border-dashed border-gray-200">
            <canvas ref={canvasRef} className="rounded-lg" />
          </div>
        </div>

        <div className="text-center mb-5">
          <p className="text-xs text-gray-400 mb-1">예약 번호</p>
          <p className="font-mono font-bold text-gray-700 tracking-wider text-sm">{r.id.toUpperCase()}</p>
        </div>

        {/* Info rows */}
        <div className="space-y-2.5 text-sm">
          {[
            { label: '장소', value: r.venue },
            { label: '주소', value: r.address },
            { label: '날짜', value: formatDate(r.date) },
            { label: '시간', value: r.time },
            { label: '예약자', value: r.customer.name },
            { label: '연락처', value: r.customer.phone },
            { label: '방문 인원', value: `${r.attendeeCount}명` },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-start gap-2">
              <span className="text-gray-400 shrink-0 w-16">{label}</span>
              <span className="font-medium text-gray-700 text-right flex-1">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tear line */}
      <div className="flex items-center px-4 my-1">
        <div className="flex-1 border-t-2 border-dashed border-gray-200" />
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: '#FFDAB9' }} className="px-6 py-3 text-center">
        <p className="text-xs text-gray-600 font-medium">
          방문 시 QR코드를 제시해 주세요&nbsp;·&nbsp;
          {r.status === 'confirmed' ? '✓ 예약확정' : '✕ 취소됨'}
        </p>
      </div>
    </div>
  );
}
