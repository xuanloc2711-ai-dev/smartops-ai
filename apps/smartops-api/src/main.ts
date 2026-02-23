import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // C5 fix: Restrict CORS to allowed origins only
    const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000')
        .split(',')
        .map(origin => origin.trim());
    app.enableCors({
        origin: allowedOrigins,
        credentials: true,
    });

    // C2 fix: Enable global validation so DTOs are enforced
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,       // Strip unknown properties
        forbidNonWhitelisted: true, // Throw error on unknown properties
        transform: true,       // Auto-transform payloads to DTO instances
    }));

    const port = process.env.PORT || 3001;
    await app.listen(port);
    Logger.log(`Backend API running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
