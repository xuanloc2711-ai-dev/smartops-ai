# Phase 06: Integration & Testing Toàn Hệ Thống
Status: ⬜ Pending
Dependencies: Phase 04, Phase 05

## Objective
Kiểm tra hiệu quả tích hợp luồng xử lý end-to-end: Web App Admin/Sales ↔ Backend ↔ Mobile App Kho/Shipper.

## Requirements
### Functional
- [ ] Tích hợp trơn tru Websocket push từ Backend sang Frontend và Mobile.
- [ ] Mô phỏng luồng: Tạo đơn (Web) → Báo giá thành công → Push (Kho) → Quét xuất thành công (Kho) → ETA (Shipper) → Done.
- [ ] Báo cáo ngoại lệ đổ về Web App Admin khi cố tình tạo lỗi.

### Non-Functional
- [ ] CI/CD: Chạy Integration Test tự động trên GitHub Actions (hoặc Gitlab CI).
- [ ] Test Database Rollback thành công khi giao dịch (transaction) gặp sự cố.

## Implementation Steps
1. [ ] Cấu hình End-to-End Tests dùng Playwright cho Web App.
2. [ ] Viết API Integration Test cho Backend.
3. [ ] Chạy luồng giả lập Mobile App (Detox/Appium).
4. [ ] Cấu hình CI để bắt buộc Pass Unit Test & E2E Test trước khi Merge PR.

## Test Criteria
- [ ] Pass 100% E2E Playwright test (1 luồng Đơn hàng hoàn chỉnh).
- [ ] Không rò rỉ (leak) resource khi mở/đóng liên tục kết nối Socket.

---
Next Phase: Phase 07 - Deployment & Monitoring
