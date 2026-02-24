export const generateId = (): string =>
  Date.now().toString(36) + Math.random().toString(36).substring(2, 8);

export const generateSlug = (): string =>
  Math.random().toString(36).substring(2, 10); // 8자리 영소문자+숫자

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'short',
  });
};

export const formatDateTime = (isoStr: string): string => {
  const d = new Date(isoStr);
  return d.toLocaleString('ko-KR', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
};

export const formatPhone = (phone: string): string => {
  const c = phone.replace(/\D/g, '');
  if (c.length === 11) return `${c.slice(0, 3)}-${c.slice(3, 7)}-${c.slice(7)}`;
  if (c.length === 10) return `${c.slice(0, 3)}-${c.slice(3, 6)}-${c.slice(6)}`;
  return phone;
};

export const getPublicBaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_PUBLIC_SITE_URL || import.meta.env.VITE_PUBLIC_BASE_URL;
  if (typeof envUrl === 'string' && envUrl.trim() !== '') {
    return envUrl.replace(/\/+$/, '');
  }
  return window.location.origin;
};

export const getEventShareUrl = (eventId: string): string => {
  const base = getPublicBaseUrl();
  return `${base}/events/${eventId}`;
};
