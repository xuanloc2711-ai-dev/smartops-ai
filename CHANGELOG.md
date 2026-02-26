# Changelog

## [2026-02-23]
### Added
- Cấu hình Rate Limiting (ThrottlerGuard) cho API Backend chặn 100 request/phút.
- Thêm `@@index` Database schema (status, shipperId, tripId) ở các bảng lớn.

### Fixed
- Vá lỗi N+1 queries tìm kiếm Database.
- Đóng API mở do thiếu giới hạn lượt gọi khiến bot có thể DDOS.
- Loại bỏ `Math.random` ở Orders, thay vào bằng UUID chuẩn.

## [2026-02-22] - Initial Skeleton MVP

### Added
- **Phase 01:** Setup cấu trúc workspace monorepo (NestJS, Next.js, React Native/Expo).
- **Phase 02:** Thiết lập Database Schema Prisma (Users, Tenants, Orders) & Global Exception Filter.
- **Phase 03:** Auth Module (JWT Login với bcrypt hash) & Orders API (Create, Webhook Zalo/Messenger, Realtime SSE).
- **Phase 04:** Frontend Admin Web (Giao diện Omnichannel Inbox, Quản lý State với Zustand).
- **Phase 05:** Mobile App Shipper/Production (Giao diện Barcode Scanner, Offline Queue Sync Hook, ShipperWorkspace screen).
- **Phase 06:** Playwright E2E testing boilerplate (Web), NestJS integration testing (API), cấu hình CI qua GitHub Actions.
- **Phase 07:** Dockerfiles (Backend, Frontend) và `docker-compose.yml` tích hợp Postgres & Redis cùng hệ thống Nginx Reverse Proxy.
- Context 2 tầng (`.brain/brain.json` và `.brain/session.json`) để Agent quản lý vòng đời.
- API Documentation tại `docs/api/endpoints.md`.

### Testing
- Unit tests cho `AuthService` (4 test cases: login thành công, email sai, password sai, error message chung).
- Unit tests cho `OrdersService` (8 test cases: tạo đơn, tính tiền x3/x5, thể tích, UUID, whitelist keys, webhook events).
- Smoke test cho `AppService`.

### Dev & Fixes
- Khắc phục lỗi Jest runner Unexpected Token (Node version mismatch Windows NVM) bằng `jest.config.mjs` + jsdom.
- Sửa TypeScript red squiggles trong test files bằng `@types/jest` + tsconfig include.
- Fix AuthService test timing bằng setTimeout 200ms cho bcrypt init.
