# Phase 05: Mobile App (Shipper & Sản Xuất)
Status: ⬜ Pending
Dependencies: Phase 03: Backend Core API

## Objective
Xây dựng React Native App dành riêng cho đội Shipper (Giao nhận) và Sản Xuất (Tại xưởng) ưu tiên thao tác quét mã, nhận Push Notification và định vị.

## Requirements
### Functional
- [ ] Màn hình Quét QR/Barcode: Dành cho Kho quét xuất hàng, Shipper quét nhận hàng (tránh nhầm đồ).
- [ ] Push Notification: Báo chuông to khi có đơn đổ về kho hoặc có điều phối mới cho Shipper.
- [ ] Background Location & Map: Lấy GPS Shipper để tính ETA và vẽ Routing trên bản đồ.
- [ ] Camera/Hình ảnh: Chụp hình bằng chứng giao hàng thành công.

### Non-Functional
- [ ] Tối ưu hóa render danh sách đơn hàng lớn (FlatList/FlashList).
- [ ] Xử lý ngoại lệ: Ghi nhận cảnh báo nếu mất quyền truy cập GPS hoặc không gửi được ảnh do rớt mạng (Offline Queue).
- [ ] Viết Unit Test cho các hàm tính toán (VD: tính khoảng cách 2 tọa độ).

## Implementation Steps
1. [ ] Khởi tạo thư mục và setup React Navigation, React Query.
2. [ ] Tích hợp Firebase Cloud Messaging (FCM) cho Push Notification.
3. [ ] Code UI quét mã và danh sách đơn.
4. [ ] Viết logic Offline-First (giữ bill khi rớt mạng).
5. [ ] Viết unit tests giả lập các state của component.

## Test Criteria
- [ ] Quét mã vạch trả về đúng ID đơn hàng, pass UI Test.
- [ ] Bật tắt mạng, tính năng Offline Queue lưu tạm thành công.

---
Next Phase: Phase 06 - Integration & Testing Toàn Hệ Thống
