import { Controller, Post, Body, Get, UseGuards, Sse, Logger, Req, Headers, UnauthorizedException } from '@nestjs/common';
import { Observable, fromEvent, merge, map } from 'rxjs';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('orders')
export class OrdersController {
    private readonly logger = new Logger(OrdersController.name);

    constructor(
        private readonly ordersService: OrdersService,
        private readonly eventEmitter: EventEmitter2
    ) { }

    @UseGuards(JwtAuthGuard)  // C3 fix: Require auth
    @Post('create')
    async createOrder(@Body() createOrderDto: CreateOrderDto, @Req() req: any) {
        this.logger.log(`User ${req.user?.email} creating order`);
        return this.ordersService.createOrder(createOrderDto);
    }

    @Post('webhook/omnichannel')
    async handleOmnichannelWebhook(
        @Body() payload: any,
        @Headers('x-zalo-signature') signature: string
    ) {
        // S3 fix: Check webhook HMAC signature
        if (!this.ordersService.verifyWebhookSignature(payload, signature)) {
            throw new UnauthorizedException('Invalid webhook signature');
        }
        return this.ordersService.handleWebhook(payload);
    }

    // W2 fix: Real SSE endpoint using EventEmitter
    @Sse('sse')
    notificationStream(): Observable<MessageEvent> {
        const orderEvents = fromEvent(this.eventEmitter, 'order.created').pipe(
            map((payload) => ({ data: { type: 'ORDER_CREATED', payload, timestamp: new Date().toISOString() } } as MessageEvent))
        );
        const webhookEvents = fromEvent(this.eventEmitter, 'webhook.zalo').pipe(
            map((payload) => ({ data: { type: 'WEBHOOK_ZALO', payload, timestamp: new Date().toISOString() } } as MessageEvent))
        );

        return merge(orderEvents, webhookEvents);
    }
}
