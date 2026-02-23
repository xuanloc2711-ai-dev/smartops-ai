# Phase 02: Database Schema & Exception Handling Base
Status: ⬜ Pending
Dependencies: Phase 01: Project Setup

## Objective
Thiết kế kiến trúc cơ sở dữ liệu (PostgreSQL + Redis) hỗ trợ đầy đủ quy trình nghiệp vụ và thiết lập module "Báo cáo sự cố" (Exception/Incident Logger).

## Requirements
### Functional
- [ ] Thiết kế schema PostgreSQL (Khách hàng, Đơn hàng, Kho/Chất liệu, Shipper, Giao dịch).
- [ ] Thiết kế bảng `System_Incidents` để ghi nhận ngoại lệ phát sinh chưa được xử lý.
- [ ] Thiết lập Redis schema cho Real-time Chat và Push Notification.

### Non-Functional
- [ ] Database phải có index đầy đủ phục vụ truy vấn tối ưu (đặc biệt SĐT khách hàng).
- [ ] Migrate script có khả năng rollback.

## Implementation Steps
1. [ ] Viết script Database Migration bằng Prisma hoặc TypeORM.
2. [ ] Tạo Unit Test cho các Database Model (Create/Read/Update/Delete).
3. [ ] Định nghĩa `ExceptionLoggerService` tại Backend để hứng mọi try-catch và ghi vào `System_Incidents`.

## Test Criteria
- [ ] Unit test cho các thao tác CRUD cơ bản phải pass (Coverage > 80%).
- [ ] Test giả lập một lỗi hệ thống và kiểm tra xem `System_Incidents` có ghi nhận đúng hay không.

---
Next Phase: Phase 03 - Backend Core API
