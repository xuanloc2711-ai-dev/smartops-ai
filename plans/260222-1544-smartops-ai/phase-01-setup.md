# Phase 01: Project Setup
Status: ⬜ Pending

## Objective
Khởi tạo cấu trúc dự án chuẩn, thiết lập môi trường phát triển (Web App, Mobile App, Backend API) và cấu hình CI/CD cơ bản.

## Requirements
### Functional
- [ ] Khởi tạo thư mục Backend (NestJS).
- [ ] Khởi tạo thư mục Frontend Web (Next.js Admin/Sales).
- [ ] Khởi tạo thư mục Mobile App (React Native Shipper/Kho).

### Non-Functional
- [ ] Linter & Formatter: Thiết lập ESLint + Prettier.
- [ ] Git: Cấu hình `.gitignore` và quy chuẩn commit (husky, commitlint).
- [ ] Unit Test: Cấu hình Jest cho tất cả module.

## Implementation Steps
1. [ ] Cài đặt NestJS CLI và khởi tạo backend `smartops-api`.
2. [ ] Khởi tạo dự án Next.js `smartops-web` với TailwindCSS.
3. [ ] Khởi tạo dự án React Native (Expo) `smartops-mobile`.
4. [ ] Cấu hình Jest test runner cho từng project.
5. [ ] Khởi tạo repository Git chung (Monorepo hoặc Multi-repo tùy chọn).

## Test Criteria
- [ ] Chạy thành công lệnh `npm run test` sinh ra test coverage rỗng/cơ bản trên cả 3 project.
- [ ] Dự án khởi động thành công trên localhost.

---
Next Phase: Phase 02 - Database Design & Exception Handling
