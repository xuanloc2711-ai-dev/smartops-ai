import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

// Mock JwtService without importing from @nestjs/jwt (avoid transitive parse issues)
const mockJwtService = {
    sign: jest.fn().mockReturnValue('mocked-jwt-token'),
    verify: jest.fn(),
};

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(async () => {
        mockJwtService.sign.mockClear();
        // Set env var for default admin password (C1 fix)
        process.env.DEFAULT_ADMIN_PASSWORD = 'Admin@123';
        // Instantiate directly with mock — avoids @nestjs/testing import chain
        service = new AuthService(mockJwtService as any);
        // Wait for async bcrypt hash init
        await new Promise(resolve => setTimeout(resolve, 200));
    });

    describe('login', () => {
        it('should return access_token khi email và password đúng', async () => {
            const result = await service.login('admin@smartops.ai', 'Admin@123');

            expect(result).toHaveProperty('access_token');
            expect(result.access_token).toBe('mocked-jwt-token');
            expect(mockJwtService.sign).toHaveBeenCalledWith({
                sub: '1',
                email: 'admin@smartops.ai',
                role: 'admin',
            });
        });

        it('should throw UnauthorizedException khi email sai', async () => {
            await expect(
                service.login('hacker@evil.com', 'Admin@123'),
            ).rejects.toThrow(UnauthorizedException);
        });

        it('should throw UnauthorizedException khi password sai', async () => {
            await expect(
                service.login('admin@smartops.ai', 'wrong-password'),
            ).rejects.toThrow(UnauthorizedException);
        });

        it('should throw với error message chung (không lộ email tồn tại)', async () => {
            try {
                await service.login('hacker@evil.com', '123456');
                fail('Should have thrown');
            } catch (e) {
                expect((e as UnauthorizedException).message).toBe('Email hoặc mật khẩu không đúng');
            }
        });
    });

    describe('validateUserById', () => {
        it('should return user khi ID tồn tại', async () => {
            const user = await service.validateUserById('1');
            expect(user).toBeDefined();
            expect(user?.email).toBe('admin@smartops.ai');
        });

        it('should return null khi ID không tồn tại', async () => {
            const user = await service.validateUserById('999');
            expect(user).toBeNull();
        });
    });
});
