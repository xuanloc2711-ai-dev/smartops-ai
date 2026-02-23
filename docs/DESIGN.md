# 🎨 DESIGN: SmartOps-AI

Ngày tạo: 2026-02-22
Dựa trên: `docs/specs/smartops_core_spec.md`

---

## 1. Cách Lưu Thông Tin (Database Schema V2)

```
┌─────────────────────────────────────────────────────────────┐
│  👤 USERS (Người dùng hệ thống)                              │
│  ├── Tên & SĐT                                              │
│  ├── Loại tài khoản (Sales / Sản xuất / Shipper / Admin)    │
│  └── Trạng thái hoạt động (Đang rảnh / Đang đi giao)        │
└───────────────────────────┬─────────────────────────────────┘
                            │ 
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  🚚 SHIPPING_TRIPS (Chuyến xe / Phiếu điều phối)           │
│  ├── Shipper phụ trách (Link tới USERS)                     │
│  ├── Tổng tải trọng hiện tại (Max 30) -> Cảnh báo > 80%     │
│  ├── Khung giờ giao nhận dự kiến (VD: 14h - 16h)            │
│  └── Trạng thái chuyến (Đang lấy hàng / Đang đi giao...)    │
└───────────────────────────┬─────────────────────────────────┘
                            │ 1 Chuyến chứa Nhiều Đơn
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  📦 ORDERS (Đơn hàng)                                       │
│  ├── Khách hàng (Link tới CPROFILE)                         │
│  ├── Chuyến xe trực thuộc (Link tới SHIPPING_TRIPS)         │
│  ├── Chi tiết món hàng & Gói dịch vụ (x3, x5)               │
│  ├── Số lượng túi đồ & Mảng Barcode từng túi (Chống thiếu)  │
│  ├── Hình ảnh SP hoàn tất (Kích hoạt Real-time Notice)      │
│  ├── Sales phụ trách (Để nhận Notice)                       │
│  ├── Địa chỉ Google Maps (Auto-complete) & Link định vị     │
│  ├── Log liên lạc Shipper (Nhật ký 3 cuộc gọi + 1 tin nhắn) │
│  └── Thể tích ước tính của đơn này                          │
└───────────────────────────┼─────────────────────────────────┘
                            │ 1 Khách có Nhiều Đơn
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  🤝 CPROFILE (Hồ sơ Khách Hàng - Tích hợp Zalo/FB)           │
│  ├── Tên, SĐT thật (Định danh)                              │
│  ├── Nguồn khách (Link Messenger / Zalo)                    │
│  ├── Số lần quay lại (Retention Metric)                     │
│  └── Tổng nợ hiện tại                                       │
└─────────────────────────────────────────────────────────────┘

================ Khối Đặc Biệt ===============================
┌─────────────────────────────────────────────────────────────┐
│  🚨 SYSTEM_INCIDENTS (Báo cáo sự cố)                        │
│  ├── Mã lỗi, Chi tiết lỗi                                   │
│  └── Trạng thái (Chưa xử lý / Đã fix)                       │
└─────────────────────────────────────────────────────────────┘
```

## 2. Danh Sách Màn Hình

### 2.1. Web App (Admin, Kế toán, Sales)
| # | Tên | Mục đích |
|---|-----|----------|
| 1 | Dashboard Tổng Quan | Xem KPI, công nợ, retention, cảnh báo lỗi (System Incidents) |
| 2 | Omnichannel Inbox | Khung chat tổng hợp, tìm SĐT, tạo báo giá/đơn hàng |
| 3 | Order Kanban | Theo dõi tiến độ đơn, cảnh báo đơn treo > 16 ngày |
| 4 | Settings & Data Center | Cấu hình chất liệu, size, khối lượng, tỷ trọng |

### 2.2. Mobile App (Shipper, Sản xuất/Kho)
| # | Tên | Mục đích |
|---|-----|----------|
| 1 | Notification Center | Xưởng nhận lệnh SX, camera cập nhật hoàn thành |
| 2 | Shipper Workspace | DS chuyến xe, thanh % thể tích (cảnh báo > 80%) |
| 3 | Barcode Scanner | Quét túi đồ đối chiếu lúc xuất xe chống thiếu sót |
| 4 | Map Routing & Log | Chỉ đường GPS, log lịch sử cuộc gọi báo hủy đơn |

## 3. Luồng Hoạt Động (User Journey)

### Hành Trình 1: Sales tạo đơn & Xưởng sản xuất
1. Sales tư vấn khách qua Inbox (định danh bằng nguồn Messenger/Zalo).
2. Tạo Bill (tự map CProfile + chọn Chất liệu + Gói dịch vụ).
3. System bắn Push Notification cho Xưởng.
4. Xưởng xử lý xong -> Chụp ảnh SP -> Quét mã túi -> Cập nhật "Chờ giao".

### Hành Trình 2: Điều phối & Shipper giao nhận
1. Admin gom đơn -> Tạo Chuyến xe (Tính % thể tích, lấy khung giờ ETA).
2. Shipper mở App -> Bắt đầu quét Barcode 100% túi đồ.
3. Nếu quét thiếu -> App block nút Bắt Đầu. Đủ -> Đi giao.
4. Shipper đi giao: GPS routing. Gửi auto SMS báo khách ETA.
5. Nếu đổi trạng thái (Gửi thành công / Boom hàng) -> Kế toán Web update sổ nợ.

## 4. Checklist Kiểm Tra & Test Cases

### Tính năng: Shipper Quét Hàng Lên Xe (Barcode Scanner & Edge Cases)
SPECS Reference: Section Mobile App & Exceptional flow

- [ ] Camera Scanner nhận diện chính xác đúng format Barcode.
- [ ] Logic chặn (`Disabled`) cứng nút Start nếu đếm số lượng `< (Tổng số mảng Barcode cần có)`.
- [ ] Validate lỗi `Rung máy + Error Red Toast` nếu quét mã Barcode không thuộc `SHIPPING_TRIP` hiện tại.
- [ ] Offline Storage lưu trữ Log quét QR tạm thời nếu mất mạng, tự bật background sync khi mạng connect lại.

---

*Tạo bởi AWF 4.1.2 - Design Phase*
