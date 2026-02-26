# SmartOps-AI API Documentation

Ngày cập nhật: 2026-02-22
Base URL: `http://localhost:3001` (Nginx proxy ngoài: `https://[domain]/api/`)

---

## 🔐 Auth

### POST /api/auth/login
Đăng nhập vào hệ thống để lấy Token.

**Request:**
```json
{ 
  "phone": "0987654321", 
  "password": "Admin@123" 
}
```

**Response (200):**
```json
{ 
  "access_token": "eyJ...", 
  "user": { 
    "id": "uuid-v4", 
    "name": "Admin",
    "role": "ADMIN" 
  } 
}
```

**Errors:**
- `401 Unauthorized`: Sai thông tin đăng nhập
- `429 Too Many Requests`: Vượt quá 100 requests / phút (Rate Limit)

---

## 📦 Orders

### POST /orders/create
Tạo đơn hàng mới và tính toán giá trị thông qua bộ tham số gói dịch vụ.

**Request:**
```json
{ 
  "barcodes": ["CODE_123", "CODE_456"], 
  "totalBags": 2, 
  "servicePackage": "x3" 
}
```

**Response (201):**
```json
{
  "id": "random-id-string",
  "status": "CONFIRMED",
  "estimatedVol": 3,
  "multiplier": 3,
  "totalAmount": 90000,
  "barcodes": ["CODE_123", "CODE_456"],
  "totalBags": 2,
  "servicePackage": "x3"
}
```

**Errors:**
- `400 Bad Request`: Order must contain at least one barcode.

---

### POST /orders/webhook/omnichannel
Endpoint hứng sự kiện webhook (thường đổ về backend từ Zalo OA / Facebook Messenger / Tổng đài).

**Request (Ví dụ):**
```json
{ 
  "event": "ZALO_MESSAGE", 
  "data": { "msg_id": "123", "text": "Hỗ trợ mình với" } 
}
```

**Response (200):**
```json
{ 
  "success": true 
}
```

---

### GET /orders/sse
Server-Sent Events endpoint dành cho các Client đăng ký luồng để nhận Push Notifications ngay khi có update dưới nền.
Được cấu hình Stream Data trực tiếp với client.
