# Design Specifications: SmartOps-AI

## Thấu hiểu Mục Tiêu Kép (UX)
Hệ thống này phục vụ 2 nhóm người dùng có môi trường làm việc hoàn toàn trái ngược:
1. **Web App (Kế toán/Sales/Admin):** Ngồi văn phòng, nhìn màn hình 8 tiếng/ngày $\to$ Cần dữ liệu dàn trải, thao tác chuột nhanh, ít mỏi mắt.
2. **Mobile App (Shipper/Sản xuất):** Đứng bốc vác, nắng chói, tay hay có mồ hôi/bụi bẩn $\to$ Cần nút siêu to, chữ nét đậm, chống bấm nhầm, cảnh báo rung/âm thanh liên tục.

---

## 🎨 Color Palette (Chuyên nghiệp - Xanh dương/Trắng/Xám)

| Name | Hex | Dành cho | Ý nghĩa thực tiễn |
|------|-----|----------|-------------------|
| Primary | `#2563EB` | Global | Xanh dương mượt (Trust) - Nút chính, Header |
| Primary Dark | `#1D4ED8` | Global | Trạng thái Hover của nút bấm |
| Secondary | `#10B981` | Global | Xanh lá - Hoàn thành đơn, Giao thành công |
| Warning | `#F59E0B` | Global | Cam - Công nợ chớm cao, Đơn treo quá ngày |
| Danger / Block | `#DC2626` | Global | Đỏ chót - Quá tải 80% thể tích, Quét sai mã |
| Background Web | `#F8FAFC` | Web | Xám khói rất sáng, làm dịu mắt Sales làm lâu |
| Background Mobile | `#FFFFFF` | Mobile | Trắng buốt để tương phản cao nhất ngoài trời sáng |
| Outline Mobile | `#E2E8F0` | Mobile | Card outline cho Shipper dễ nhìn viền nút bấm |
| Text | `#0F172A` | Global | Đen xám sâu - Chữ chính |
| Text Muted | `#64748B` | Global | Chữ phụ, hướng dẫn nhỏ |

---

## 📝 Typography (Rõ nét tuyệt đối)

**Font mặc định:** `Inter` (rất dễ đọc dữ liệu số, quan trọng với Kế toán).

| Element | Size (Web) | Size (Mobile) | Weight | Usage |
|---------|------------|---------------|--------|-------|
| Thẻ H1 | 32px | 24px | 700 | Tên Màn Hình / Mã Đơn Hàng to nhất |
| Thẻ H2 | 24px | 20px | 600 | Tên Khách / Tiêu đề danh sách |
| Body | 14px | 16px | 400 | Chữ thường (Web cần nhỏ để hiển thị nhiều data, Mobile cần to để dễ với ngón tay) |
| Scan Number | - | 48px | 800 | Số đếm Barcode lúc quét (VD: **2/3**) - Phải rực rỡ và đập vào mắt |

---

## 🔲 Giao diện đặc thù (Optimal UX Patterns)

### 1. Web App - Omnichannel Inbox (Sales)
- **Kiểu dáng:** Split-pane 3 cột liền mạch giống Notion/Slack.
- **Micro-Interaction:** 
  - Gõ phím số điện thoại $\to$ debounce 300ms tự fetch dữ liệu CProfile không cần ấn `<Enter>`.
  - Có Toast message bay ra ở góc dưới bên phải báo "Đã lưu bản nháp đơn hàng" mỗi 10s.
- **Tiện dụng:** Auto-format tiền VND (1000 $\to$ 1,000) real-time khi gõ.

### 2. Mobile App - Shipper Scanner (Đóng thùng & Xuất bến)
- **Visual Feedback:** 
  - Nút "Bắt đầu đi giao": Mặc định là MÀU XÁM (#CBD5E1) và KHÔNG THỂ BẤM (Disabled).
  - Quét mã 1: Kêu "Bíp", hiện màu vàng.
  - Quét mã cuối: Kêu "Típ Típ", màn hình nháy sáng màu Xanh (#10B981), nút bấm BỪNG SÁNG hiện màu Xanh đậm, RUNG máy 1 nhịp nhẹ.
  - Quét dư/sai: Kêu âm thanh chói "Bípppp", màn hình chớp Đỏ (#DC2626), hiển thị "⚠️ SAI MÃ ĐƠN KHÁC".
- **Kích thước nút bấm:** Chiều cao tối thiểu `min-h: 56px` trên màn điện thoại để mang bao tay vẫn bấm chuẩn.
- **Tiện dụng:** Chống chói lóa ngoài trời bằng cách dùng chữ Đen nhánh (#000000) trên nền Trắng tinh (#FFFFFF) cho màn Scanner.

---

## 📐 Spacing & Breakpoints

**Khoảng không gian (Web):**
- Giữa các ô (Gutter): `16px` (Tight - để nhồi nhiều data vào 1 màn hình quản lý).

**Breakpoints (Responsive):**
- Mobile: `< 768px` (Giao diện Shipper / Xưởng).
- Tablet: `768px - 1024px` (Xưởng dùng iPad treo tường).
- Desktop: `> 1024px` (Web quản lý - Luôn bung full width `max-w-none` để lấy không gian hiển thị Data Table).

## ✨ Animations (Tiết chế & Mượt)
- Loading (Khi chờ API Zalo/Báo giá): Dùng **Skeleton Loading** (Mảng xám nhấp nháy chuyển động mượt 1000ms linear) để tạo cảm giác App rất xịn chứ không dùng Vòng xoay (Spinner) rẻ tiền.
- Fade-in list: Tốc độ 150ms `ease-out` khi load item mới trong Kanban.
