# 💡 BRIEF: SmartOps-AI

**Ngày tạo:** 2026-02-22
**Brainstorm cùng:** User

---

## 1. VẤN ĐỀ CẦN GIẢI QUYẾT
**Sales & CSKH:**
- Đứt gãy hội thoại, mất dữ liệu khi đổi nhân sự trên Zalo (do giới hạn thiết bị đăng nhập).
- Tìm kiếm thông tin khách trên Messenger thủ công, chưa tìm được theo SĐT để định danh nhanh.
- Rào cản thao tác khi phải liên tục chuyển tab giữa Zalo, Messenger và hệ thống nội bộ.
- Báo giá chậm, sai lệch do phụ thuộc Excel thủ công và thiếu DB chất liệu chuẩn.

**Sản xuất & Vận hành nội bộ:**
- Khó phân tách vai trò Sales Online (văn phòng) và Sales Offline (cửa hàng) do thiếu đồng bộ trạng thái đơn.
- Đơn hàng treo quá lâu (có thể lên tới 16-23 ngày) do cập nhật trạng thái thủ công.
- Thiếu thông báo thời gian thực (Real-time Notice) khi sản phẩm hoàn thành.

**Giao nhận (Shipper):**
- Đi sai địa chỉ do: khách ghim sai, Sales nhập tay sai, chưa có bản đồ trực quan, Shipper ngại gọi xác nhận lại.
- Giao nhầm/thiếu đồ do quy trình nhận hàng thủ công, Shipper không đối chiếu kỹ với bill trước khi rời tiệm.
- Quá tải thùng xe đột xuất do thiếu công cụ đo lường và cảnh báo thể tích ghép đơn.
- Sai lệch độ trễ do Shipper tự hẹn khách mà không ước lượng được chính xác thời gian di chuyển.

**Tài chính & Quản lý:**
- Thiếu tự động hóa cảnh báo công nợ.
- Dữ liệu khách quay lại (Retention) đã có nhưng hiển thị rời rạc, chưa tập trung để khai thác hiệu quả.

## 2. GIẢI PHÁP ĐỀ XUẤT
Hệ thống ERP mini kết hợp Social CRM tích hợp luồng vận hành xuyên suốt từ: Online/Offline Sales → Sản xuất → Giao nhận → Quản trị tài chính trên một nền tảng dữ liệu duy nhất.

## 3. ĐỐI TƯỢNG SỬ DỤNG
- **Primary (Vận hành chính):** Nhân viên Sales/CSKH, Nhân viên Sản xuất, Shipper.
- **Secondary (Quản lý):** Quản lý cấp cao, Kế toán.

## 4. TÍNH NĂNG ĐỀ XUẤT (Brainstorm)

### 🚀 MVP (Cần ưu tiên làm trước):
- [ ] **Omnichannel Inbox:** Gom Zalo, Messenger về 1 màn hình, tìm kiếm theo SDT, hỗ trợ load hội thoại nhiều thiết bị.
- [ ] **Quản lý Đơn hàng & Báo giá:** Chọn chất liệu từ DB chuẩn để tự động tính giá; Dashboard theo dõi trạng thái đơn hàng Real-time (có cảnh báo đơn treo lố ngày).
- [ ] **Module Kho & Sản xuất:** Chia ca/role rõ ràng (Online/Offline), hệ thống push notification ngay khi đồ làm xong.
- [ ] **Module Shipper:** Checklist đối chiếu bill khi nhận hàng; Tự động tính toán & cảnh báo thể tích xe; Hiển thị bản đồ/routing tối ưu.
- [ ] **Mini CRM & Tài chính:** Profile khách hàng tập trung (gom lịch sử mua/retention), tự động báo cáo & cảnh báo công nợ.

### 🎁 Phase 2 (Làm sau):
- [ ] Tích hợp sâu AI để gợi ý kịch bản trả lời CSKH tự động.
- [ ] App định vị GPS real-time cho Shipper để báo ETA chính xác cho khách.

## 5. ƯỚC TÍNH SƠ BỘ
- **Độ phức tạp:** Phức tạp (Cần xử lý realtime websocket, tích hợp API Zalo/FB, thuật toán routing/thể tích).
- **Rủi ro kỹ thuật:** API của Zalo/Facebook có thể thay đổi policy; Cần thời gian thiết lập chuẩn hóa DB (size chất liệu, mapping thể tích).

## 6. BƯỚC TIẾP THEO
→ Hoàn thiện Brief và chuyển sang `/plan` để thiết kế Database & System Architecture.
