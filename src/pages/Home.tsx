import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section
        className="flex-1 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #91ADC2 0%, #7a97ae 50%, #6b8a9f 100%)' }}
      >
        <div className="max-w-2xl mx-auto px-4 py-24 text-center w-full">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            모델하우스·분양사무소<br />
            <span style={{ color: '#FFDAB9' }}>방문 예약</span>을 스마트하게
          </h1>
          <p className="text-lg text-blue-100 mb-10">
            시간대별 정원 제한으로 방문자 혼잡을 방지하고<br className="hidden md:block" />
            QR 코드 티켓으로 현장 운영을 효율화하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/events')}
              className="px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg"
              style={{ backgroundColor: '#FFDAB9', color: '#5a7a8a' }}
            >
              예약 목록 보기 <ChevronRight className="inline" size={20} />
            </button>
            <button
              onClick={() => navigate('/my-tickets')}
              className="px-8 py-4 rounded-xl font-bold text-lg bg-white/20 text-white hover:bg-white/30 transition-all border border-white/40"
            >
              내 예약 확인
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
