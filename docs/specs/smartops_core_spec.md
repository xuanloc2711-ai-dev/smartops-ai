# System Specs: SmartOps-AI Core
Created: 2026-02-22

## 1. Executive Summary
SmartOps-AI là hệ thống ERP mini kết hợp Social CRM điều hướng dữ liệu từ Sales (chốt đơn Zalo/Messenger) qua nền tảng Core (Node.js) đến xưởng Sản xuất (cập nhật trạng thái) và Shipper (map/routing).
**Điểm nhấn:** Có cơ chế Exception Logging độc lập để ghi nhận, báo cáo và lưu trữ các tình huống phát sinh hệ thống chưa xử lý được, phục vụ Update & Scale hệ thống.

## 2. User Stories
### Admin & C-Level
- Xem toàn cảnh dòng tiền, công nợ.
- Nhận Dashboard cảnh báo lỗi hệ thống/ngoại lệ (Exceptions) chưa được xử lý.

### Sales (Web)
- Đăng nhập, mở màn hình Omnichannel Inbox.
- Tạo đơn hàng cho khách với dữ liệu chất liệu chuẩn (Tránh sai lệch File Excel).

### Sản xuất / Kho (Web & Mobile)
- Quét mã QR bill bằng điện thoại để báo: "Đã làm xong".
- Quét lại lúc xuất hàng cho Shipper (Ngăn ngừa sai sót).

### Shipper (Mobile)
- Dùng App để xem danh sách chuyến.
- Hệ thống hỗ trợ tính/cảnh báo thể tích ghép đơn.
- Xem Routing, cập nhật tiến độ (ETA) chính xác.

## 3. Database Design (Core)
- **Users Table:** id, username, role (admin, sales, kho, shipper).
- **Customers Table:** id, phone (Indexed), name, ref_retention.
- **Orders Table:** id, customer_id, product_data, status, expected_delivery, volume_size.
- **System_Incidents Table:** id, error_code, module, description, raw_payload, status (pending/resolved).

## 4. Exception Handling Strategy (Xử lý Ngoại lệ)
- Mọi module (Zalo Webhook, Order Pricing, Routing) đều được bọc trong vòng `try...catch` gắn liền với `ExceptionLoggerService`.
- Nếu có mã lỗi không nằm trong bộ mã (Known Errors), service sẽ `INSERT` vào bảng `System_Incidents` kèm toàn bộ Raw Payload để dev team trace lỗi (Ví dụ: Zalo đổi cấu trúc JSON đột xuất).
- Gửi trigger bắn tin nhắn thẳng qua Slack/Telegram đến nhóm Dev.

## 5. Deployment / Tech Stack
- Frontend Admin: **Next.js** + TailwindCSS
- Mobile App: **React Native** + Firebase push
- Backend: **NestJS** + PostgreSQL + Redis
- CI/CD: Viết Test tự động (Jest + Playwright) chạy trên GitHub Actions trước khi deploy.

## 6. Testing Strategy
- **TDD (Test-Driven Development):** Code từng service đều đi kèm file `.spec.ts` ngay lập tức. Cần đạt tối thiểu 80% coverage.
- End-to-End Test (E2E) dùng Playwright cho các luồng User Journey chính.
