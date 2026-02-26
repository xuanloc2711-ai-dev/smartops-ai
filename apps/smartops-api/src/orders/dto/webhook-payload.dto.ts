/**
 * Webhook payload DTO cho các sự kiện từ Zalo OA, Messenger, v.v.
 */
export interface WebhookPayload {
    /** Tên sự kiện, ví dụ: 'ZALO_MESSAGE', 'MESSENGER_MESSAGE' */
    event: string;
    /** ID hoặc tên người gửi */
    from?: string;
    /** Nội dung tin nhắn (nếu có) */
    content?: string;
    /** Metadata bổ sung */
    [key: string]: unknown;
}
