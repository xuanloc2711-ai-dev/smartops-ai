# Phase 03: Backend Core API & Modules
Status: ⬜ Pending
Dependencies: Phase 02: Database Schema & Exception Handling Base

## Objective
Xây dựng các RESTful API và Websocket Gateway xử lý core logic: Báo giá, Quản lý đơn, Tích hợp kênh chat, và Tracking shipper.

## Requirements
### Functional
- [ ] Omnichannel Module: API webhook nhận và gửi tin Zalo/Messenger.
- [ ] Order Module: Logic tính giá đơn hàng dựa trên chất liệu.
- [ ] Notification Module: Server-Sent Events (SSE) hoặc WebSockets báo trạng thái đơn cho Xưởng/Shipper.
- [ ] Error Report Module: Ghi nhận cảnh báo khi Zalo token hết hạn hoặc lỗi tính toán.

### Non-Functional
- [ ] Tất cả endpoint RESTful phải có unit test bao phủ Happy Flow và Exception Flow.
- [ ] Strict Typing với TypeScript.
- [ ] Authorization guards (Admin vs Sales vs Shipper).

## Implementation Steps
1. [ ] Xây dựng Auth Module (JWT).
2. [ ] Xây dựng Omnichannel Webhook Gateway.
3. [ ] Xây dựng Order Processing Service.
4. [ ] Viết unit tests chuyên sâu cho Order Service (Mocks DB).

## Test Criteria
- [ ] Dùng thư viện `supertest` để HTTP testing toàn bộ API chính đạt coverage > 85%.
- [ ] Báo lỗi trả về chuẩn format `{ error, message, timestamp }`.

---
Next Phase: Phase 04 - Frontend & WebApp Admin
