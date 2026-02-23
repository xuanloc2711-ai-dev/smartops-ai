import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { randomUUID, createHmac } from 'crypto';
import { CreateOrderDto } from './dto/create-order.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class OrdersService {
    private readonly logger = new Logger(OrdersService.name);

    constructor(private readonly eventEmitter: EventEmitter2) { }

    public async createOrder(data: CreateOrderDto) {
        const multiplier = data.servicePackage === 'x3' ? 3 : data.servicePackage === 'x5' ? 5 : 1;
        const estimatedVol = data.totalBags * 1.5;

        const order = {
            id: randomUUID(),             // S1 fix: crypto UUID instead of Math.random
            status: 'CONFIRMED',
            barcodes: data.barcodes,       // S4 fix: Whitelist only necessary fields
            servicePackage: data.servicePackage,
            totalBags: data.totalBags,
            estimatedVol,
            multiplier,
            totalAmount: 15000 * multiplier * data.totalBags,
            createdAt: new Date().toISOString(),
        };

        this.logger.log(`Order ${order.id} created: ${order.totalAmount}₫`); // W3 fix: Logger
        this.eventEmitter.emit('order.created', order); // W2 fix: emit event for SSE
        return order;
    }

    public verifyWebhookSignature(payload: any, signature: string): boolean {
        const secret = process.env.ZALO_WEBHOOK_SECRET;
        if (!secret) return true; // Fail-open or bypass in dev if not set

        let payloadString = '';
        if (typeof payload === 'string') {
            payloadString = payload;
        } else {
            payloadString = JSON.stringify(payload);
        }

        const expectedSignature = createHmac('sha256', secret)
            .update(payloadString)
            .digest('hex');

        return expectedSignature === signature;
    }

    public async handleWebhook(payload: any) {
        if (payload.event === 'ZALO_MESSAGE') {
            this.logger.log(`Processed Zalo Webhook from: ${payload.from || 'unknown'}`); // W3 fix
            this.eventEmitter.emit('webhook.zalo', payload); // W2 fix: emit event for SSE
            return { success: true };
        }
        this.logger.warn(`Unhandled webhook event: ${payload.event}`);
        return { success: false, reason: 'unhandled_event' };
    }
}
