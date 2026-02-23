import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/auth/login (POST)', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: 'admin@smartops.ai', password: 'admin123' })
            .expect(200)
            .expect((res) => {
                expect(res.body.access_token).toBeDefined();
            });
    });

    it('/orders/create (POST)', () => {
        return request(app.getHttpServer())
            .post('/orders/create')
            .send({ barcodes: ['123', '456'], totalBags: 2, servicePackage: 'x3' })
            .expect(201)
            .expect((res) => {
                expect(res.body.totalAmount).toEqual(90000); // 15000 * 3 * 2
            });
    });
});
