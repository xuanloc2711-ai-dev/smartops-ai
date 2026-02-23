import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const errorResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            errorBase: exception instanceof Error ? exception.message : String(exception),
        };

        // W3 fix: Use NestJS Logger instead of console.error
        if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
            this.logger.error(`[System Incident] ${JSON.stringify(errorResponse)}`, (exception as Error)?.stack);
        }

        response.status(status).json(errorResponse);
    }
}
