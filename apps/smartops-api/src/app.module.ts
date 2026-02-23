import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './exceptions/all-exceptions.filter';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
    imports: [
        AuthModule,
        OrdersModule,
        EventEmitterModule.forRoot(),
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
    ],
})
export class AppModule { }
