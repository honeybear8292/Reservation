# Reservation

Cloudflare Pages + D1 기반 방문 예약 서비스입니다.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Cloudflare Pages + D1 Setup

### 1) D1 생성

```bash
npx wrangler d1 create reservation
```

생성 후 출력되는 `database_id`를 `wrangler.toml`의 `database_id`에 반영합니다.

### 2) 스키마 적용

```bash
npx wrangler d1 execute reservation --remote --file=migrations/0001_init.sql
```

### 3) Pages 프로젝트 환경 바인딩

Cloudflare Dashboard > Pages > (프로젝트) > Settings > Functions > D1 bindings

- Variable name: `DB`
- D1 database: `reservation`

### 4) Git 연동 배포

Build settings:

- Build command: `npm run build`
- Build output directory: `dist`

## Public Share URL 설정

관리자 화면에서 복사되는 예약 공유 URL의 도메인을 고정하려면 환경변수를 설정하세요.

- `VITE_PUBLIC_SITE_URL`: 예) `https://reservation.example.com`

## API Endpoints (Pages Functions)

- `GET /api/events`
- `POST /api/events`
- `PUT /api/events/:id`
- `DELETE /api/events/:id`
- `GET /api/reservations`
- `POST /api/reservations`
- `PATCH /api/reservations/:id/cancel`
- `PATCH /api/reservations/:id/checkin`

프론트엔드는 API 우선으로 동작하며, 로컬 개발에서는 기존 localStorage 폴백을 유지합니다.
