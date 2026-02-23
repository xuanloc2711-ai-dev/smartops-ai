# SmartOps-AI

Hệ thống ERP mini tích hợp Omnichannel (Zalo, Messenger) để tối ưu luồng vận hành từ Sales, Sản xuất đến Giao nhận.

## Status: 🚧 Development (Skeleton MVP)

7 Phases hoàn tất: Monorepo Setup → DB Schema → Auth & API → Admin Web → Mobile App → Testing → Docker.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | NestJS + TypeScript |
| Frontend | Next.js 14 + TailwindCSS + Zustand |
| Mobile | React Native (Expo) |
| Database | PostgreSQL 15 + Prisma |
| Cache | Redis 7 |
| Infra | Docker Compose + Nginx |
| CI/CD | GitHub Actions |

## Quick Start

```bash
# 1. Clone & Install
npm install

# 2. Copy env
cp .env.example .env

# 3. Run with Docker
docker-compose up -d

# 4. Or run dev mode
npm run dev
```

## Project Structure

```
SmartOps AI/
├── apps/
│   ├── smartops-api/     # NestJS Backend (Auth, Orders, SSE)
│   ├── smartops-web/     # Next.js Admin (Omnichannel Inbox)
│   └── smartops-mobile/  # Expo Mobile (Barcode Scanner, Offline Queue)
├── docs/                 # BRIEF, DESIGN, API docs, Specs
├── plans/                # Implementation plans
├── .brain/               # AI context (brain.json, session.json)
├── docker-compose.yml    # Postgres + Redis + API + Web
└── nginx.conf            # Reverse proxy config
```

## Environment Variables

Xem `.env.example` cho danh sách đầy đủ: Database, Redis, JWT, CORS.

## Testing

```bash
# Backend unit tests
cd apps/smartops-api && npm test

# Web tests
cd apps/smartops-web && npm test
```

## Tài liệu

- [BRIEF](docs/BRIEF.md) - Mô tả vấn đề & giải pháp
- [DESIGN](docs/DESIGN.md) - Thiết kế DB Schema & User Journey
- [API Docs](docs/api/endpoints.md) - API Documentation
- [CHANGELOG](CHANGELOG.md) - Lịch sử thay đổi

## Next Steps

1. Implement real Prisma migrations (SHIPPING_TRIPS, CPROFILE tables)
2. Tích hợp Zalo OA API & Facebook Messenger API
3. Implement real JWT auth với database
4. Barcode Scanner camera thật trên Expo
