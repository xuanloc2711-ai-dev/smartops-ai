import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OmnichannelInbox from '../src/components/OmnichannelInbox';
import '@testing-library/jest-dom'; // Bổ sung DOM matchers cho jest

describe('OmnichannelInbox - Thực chiến Khung giao diện Web', () => {

    it('1. Render trạng thái ban đầu: Phải hiển thị rỗng & kêu gọi người dùng click', () => {
        render(<OmnichannelInbox />);

        // Mong đợi màn hình rảnh rang vì chưa chọn khách hàng
        expect(screen.getByText('Chọn một phiên chat để bắt đầu')).toBeInTheDocument();
    });

    it('2. Load danh sách từ Store: Hiển thị đầy đủ khách đang chờ', () => {
        render(<OmnichannelInbox />);

        // Nguyễn Văn A và Trần Thị B phải có mặt ở cột trái
        expect(screen.getByText('Nguyễn Văn A')).toBeInTheDocument();
        expect(screen.getByText('Trần Thị B')).toBeInTheDocument();

        // Badge cho nền tảng
        expect(screen.getByText('zalo')).toBeInTheDocument();
        expect(screen.getByText('messenger')).toBeInTheDocument();
    });

    it('3. Thao tác Sales/Admin: Click người dùng -> Xem tin -> Phản hồi lập tức', () => {
        render(<OmnichannelInbox />);

        // BƯỚC 1: Admin chọc vào "Nguyễn Văn A" để xem
        const userA = screen.getByText('Nguyễn Văn A');
        fireEvent.click(userA);

        // BƯỚC 2: Màn hình phải hiện tin nhắn của A "Shop tư vấn giá nhé"
        expect(screen.getAllByText('Shop tư vấn giá nhé').length).toBeGreaterThan(0);

        // BƯỚC 3: Admin chat vội câu trả lời
        const chatInput = screen.getByPlaceholderText('Nhập tin nhắn...');
        fireEvent.change(chatInput, { target: { value: 'Dạ, mẫu này đang Sale 50% ạ!' } });

        // BƯỚC 4: Gõ Enter bung tin nhắn đi
        fireEvent.keyDown(chatInput, { key: 'Enter', code: 'Enter', charCode: 13 });

        // BƯỚC 5: Phép màu! Tin nhắn xuất hiện ngay trên UI (Zustand Trigger)
        expect(screen.getByText('Dạ, mẫu này đang Sale 50% ạ!')).toBeInTheDocument();
    });
});
