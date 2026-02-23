import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

// Tạm dùng in-memory user store — sẽ chuyển sang Prisma DB sau
const USERS_STORE = [
    {
        id: '1',
        email: 'admin@smartops.ai',
        // Hash of 'Admin@123' (bcrypt 10 rounds)
        passwordHash: '',
        role: 'admin',
    },
];

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    private initialized = false;

    constructor(private readonly jwtService: JwtService) {
        this.initDefaultUser();
    }

    private async initDefaultUser() {
        if (!this.initialized) {
            const defaultPwd = process.env.DEFAULT_ADMIN_PASSWORD;
            if (!defaultPwd) {
                this.logger.warn('DEFAULT_ADMIN_PASSWORD not set! Admin login disabled.');
                this.initialized = true;
                return;
            }
            USERS_STORE[0].passwordHash = await bcrypt.hash(defaultPwd, 10);
            this.initialized = true;
            this.logger.log('Default admin user initialized');
        }
    }

    public async login(email: string, password: string): Promise<{ access_token: string }> {
        const user = USERS_STORE.find(u => u.email === email);
        if (!user) {
            throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
        }

        // Ensure init is complete
        if (!this.initialized) {
            await this.initDefaultUser();
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
        }

        const payload = { sub: user.id, email: user.email, role: user.role };
        const access_token = this.jwtService.sign(payload);

        this.logger.log(`User ${email} logged in successfully`);
        return { access_token };
    }

    public async validateUserById(userId: string) {
        return USERS_STORE.find(u => u.id === userId) || null;
    }
}
