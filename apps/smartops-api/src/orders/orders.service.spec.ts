import { OrdersService } from './orders.service';
import { CreateOrderDto, ServicePackage } from './dto/create-order.dto';

describe('OrdersService', () => {
    let service: OrdersService;

    let mockEventEmitter: any;

    beforeEach(() => {
        mockEventEmitter = { emit: jest.fn() };
        service = new OrdersService(mockEventEmitter);
    });

    describe('createOrder', () => {
        const validOrder: CreateOrderDto = {
            barcodes: ['BC-001', 'BC-002'],
            servicePackage: ServicePackage.X3,
            totalBags: 10,
        };

        it('should tạo đơn hàng thành công với data hợp lệ', async () => {
            const result = await service.createOrder(validOrder);

            expect(result).toHaveProperty('id');
            expect(result.status).toBe('CONFIRMED');
            expect(result.barcodes).toEqual(['BC-001', 'BC-002']);
            expect(result.servicePackage).toBe('x3');
            expect(result.totalBags).toBe(10);
            expect(result).toHaveProperty('createdAt');
        });

        it('should tính đúng tổng tiền với gói x3', async () => {
            const result = await service.createOrder(validOrder);

            // 15000 * 3 (multiplier) * 10 (bags) = 450,000
            expect(result.multiplier).toBe(3);
            expect(result.totalAmount).toBe(450000);
        });

        it('should tính đúng tổng tiền với gói x5', async () => {
            const order: CreateOrderDto = {
                barcodes: ['BC-001'],
                servicePackage: ServicePackage.X5,
                totalBags: 5,
            };
            const result = await service.createOrder(order);

            // 15000 * 5 (multiplier) * 5 (bags) = 375,000
            expect(result.multiplier).toBe(5);
            expect(result.totalAmount).toBe(375000);
        });

        it('should tính đúng thể tích ước lượng (estimatedVol)', async () => {
            const result = await service.createOrder(validOrder);

            // 10 bags * 1.5 = 15
            expect(result.estimatedVol).toBe(15);
        });

        it('should tạo UUID hợp lệ cho mỗi đơn', async () => {
            const result = await service.createOrder(validOrder);

            // UUID format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
            expect(result.id).toMatch(
                /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
            );
        });

        it('should NOT chứa trường thừa trong response (whitelist)', async () => {
            const result = await service.createOrder(validOrder);

            const allowedKeys = [
                'id', 'status', 'barcodes', 'servicePackage',
                'totalBags', 'estimatedVol', 'multiplier', 'totalAmount', 'createdAt',
            ];
            const resultKeys = Object.keys(result);
            expect(resultKeys.sort()).toEqual(allowedKeys.sort());
        });
    });

    describe('handleWebhook', () => {
        it('should xử lý thành công sự kiện ZALO_MESSAGE', async () => {
            const payload = { event: 'ZALO_MESSAGE', from: 'user123', content: 'Hello' };
            const result = await service.handleWebhook(payload);

            expect(result).toEqual({ success: true });
        });

        it('should trả về lỗi cho sự kiện không xử lý được', async () => {
            const payload = { event: 'UNKNOWN_EVENT' };
            const result = await service.handleWebhook(payload);

            expect(result).toEqual({ success: false, reason: 'unhandled_event' });
        });

        it('should handle ZALO_MESSAGE khi thiếu trường from', async () => {
            const payload = { event: 'ZALO_MESSAGE' };
            const result = await service.handleWebhook(payload);

            expect(result).toEqual({ success: true });
        });
    });
});
