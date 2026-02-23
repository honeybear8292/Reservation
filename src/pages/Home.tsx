import { useNavigate } from 'react-router-dom';
import { ChevronRight, CalendarCheck, Clock, Users, QrCode, Bell, Shield, BarChart2, Smartphone, Star } from 'lucide-react';

const features = [
  { icon: <CalendarCheck size={26} />, title: '날짜 선택 예약', desc: '원하는 날짜를 선택해 간편하게 방문 예약' },
  { icon: <Clock size={26} />, title: '시간대별 인원 제한', desc: '시간대별 최대 방문 인원을 설정해 혼잡 방지' },
  { icon: <Users size={26} />, title: '방문 인원 설정', desc: '가족·동반인원 포함 방문자 수 입력' },
  { icon: <QrCode size={26} />, title: 'QR 모바일 티켓', desc: '예약 완료 후 QR 코드로 간편 방문 확인' },
  { icon: <Bell size={26} />, title: '실시간 현황 관리', desc: '관리자 패널에서 예약 현황 실시간 확인' },
  { icon: <Shield size={26} />, title: '예약 취소·변경', desc: '방문자 및 관리자 모두 예약 취소 가능' },
  { icon: <BarChart2 size={26} />, title: '방문자 통계', desc: '시간대별·일별·월별 방문 현황 분석' },
  { icon: <Smartphone size={26} />, title: 'PC·모바일 최적화', desc: '모든 기기에서 편리하게 사용 가능' },
];

const useCases = [
  { emoji: '🏢', title: '아파트 입주박람회', desc: '입주민 대상 박람회 시간대별 입장 관리' },
  { emoji: '🏗️', title: '분양사무소 방문', desc: '신규 분양 아파트 상담 예약 접수' },
  { emoji: '🏠', title: '모델하우스 관람', desc: '모델하우스 관람객 시간대별 예약 운영' },
  { emoji: '📋', title: '부동산 상담 예약', desc: '입주·분양 관련 전담 상담사 예약 배정' },
];

const steps = [
  { num: '01', title: '예약 등록', desc: '관리자가 행사명, 장소, 날짜, 시간대별 정원을 설정하고 예약을 오픈합니다.' },
  { num: '02', title: '방문 예약', desc: '방문자가 날짜·시간을 선택하고 이름·연락처를 입력해 예약을 완료합니다.' },
  { num: '03', title: 'QR 방문 확인', desc: '발급된 QR 코드를 현장에서 제시하면 간편하게 방문이 확인됩니다.' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="relative min-h-[520px] flex items-center"
        style={{ background: 'linear-gradient(135deg, #91ADC2 0%, #7a97ae 50%, #6b8a9f 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-4 py-24 text-center w-full">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
            style={{ backgroundColor: 'rgba(255,218,185,0.25)', color: '#FFDAB9' }}
          >
            <Star size={14} /> 부동산 방문 예약 시스템
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            입주박람회·분양사무소<br />
            <span style={{ color: '#FFDAB9' }}>방문 예약</span>을 스마트하게
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
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
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-50" style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }} />
      </section>

      {/* Use cases */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2">이런 상황에 딱 맞습니다</h2>
            <p className="text-gray-500 text-sm">부동산 관련 방문 예약 전 과정을 온라인으로 관리하세요</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {useCases.map((u, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-all">
                <p className="text-4xl mb-3">{u.emoji}</p>
                <h3 className="font-bold text-gray-800 text-sm mb-1">{u.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2">주요 기능</h2>
            <p className="text-gray-500 text-sm">예약부터 현장 운영까지 필요한 모든 기능</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div key={i} className="rounded-2xl p-5 text-center hover:shadow-md transition-all border border-gray-100">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 text-white"
                  style={{ backgroundColor: '#91ADC2' }}
                >
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-800 text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16" style={{ backgroundColor: '#FFDAB9' }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2">이용 방법</h2>
            <p className="text-gray-600 text-sm">3단계로 간편하게</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm text-center relative">
                <div className="text-5xl font-black mb-3 opacity-15" style={{ color: '#91ADC2' }}>{s.num}</div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                {i < steps.length - 1 && (
                  <ChevronRight size={24} className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:block" style={{ color: '#91ADC2' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-3">지금 예약을 시작하세요</h2>
          <p className="text-gray-500 mb-8 text-sm">방문 예약 후 QR 코드를 저장해 두시면 현장에서 빠르게 입장하실 수 있습니다.</p>
          <button
            onClick={() => navigate('/events')}
            className="px-10 py-4 rounded-xl font-bold text-lg text-white transition-all hover:opacity-90 shadow-md hover:scale-105"
            style={{ backgroundColor: '#91ADC2' }}
          >
            방문 예약하기
          </button>
        </div>
      </section>
    </div>
  );
}
