import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function CompanyInfo() {
  const { companyInfo, updateCompanyInfo } = useApp();
  const [name, setName] = useState(companyInfo.name);
  const [address, setAddress] = useState(companyInfo.address);
  const [email, setEmail] = useState(companyInfo.email);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateCompanyInfo({ name: name.trim(), address: address.trim(), email: email.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const inputCls = 'w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#667EEA]';
  const labelCls = 'block text-sm font-semibold text-gray-700 mb-1.5';

  return (
    <div className="max-w-xl space-y-5">
      <h2 className="font-bold text-gray-800">회사 정보</h2>

      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
        <div>
          <label className={labelCls}>회사명</label>
          <input
            className={inputCls}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="예) 리저브티켓"
          />
        </div>
        <div>
          <label className={labelCls}>회사 주소</label>
          <input
            className={inputCls}
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="예) 경기도 성남시 분당구 판교역로 146"
          />
        </div>
        <div>
          <label className={labelCls}>회사 이메일</label>
          <input
            type="email"
            className={inputCls}
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="예) contact@reserveticket.co.kr"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl text-white font-semibold text-sm hover:opacity-90"
          style={{ backgroundColor: saved ? '#22c55e' : '#667EEA' }}
        >
          {saved ? '저장됨' : '저장'}
        </button>
      </div>
    </div>
  );
}
