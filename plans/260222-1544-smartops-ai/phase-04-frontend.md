# Phase 04: Frontend Web Admin (Sales & Kế toán)
Status: ⬜ Pending
Dependencies: Phase 03: Backend Core API

## Objective
Xây dựng giao diện Web Next.js cung cấp Omnichannel Inbox, Quản lý đơn hàng, Tính năng Báo giá và Báo cáo Công nợ.

## Requirements
### Functional
- [ ] Màn hình Omnichannel Inbox: Giao diện chat nhiều cột, tối ưu tốc độ gõ phím.
- [ ] Màn hình Quản lý đơn: Bảng Kanban hoặc DataGrid hiển thị trạng thái đơn. Dễ dàng filter đơn "treo".
- [ ] Cảnh báo sự cố: Màn hình "System Log" dành cho Admin theo dõi các lỗi ngoại lệ từ Backend dội về.

### Non-Functional
- [ ] Viết Unit Test cho các Custom Hooks và Utils (Ví dụ: hàm tính tổng tiền).
- [ ] Sử dụng React Testing Library cho các UI Component quan trọng.

## Implementation Steps
1. [ ] Setup Next.js App Router, TailwindCSS, và Zustand (State Management).
2. [ ] Tích hợp Socket.io-client để realtime inbox.
3. [ ] Build các React Components và gắp API.
4. [ ] Viết unit tests cho các UI.

## Test Criteria
- [ ] Các logic validate form (tạo đơn, nhập số tiền) pass 100% unit test.
- [ ] Render trơn tru không có lỗi hydration.

---
Next Phase: Phase 05 - Mobile App Shipper & Sản Xuất
