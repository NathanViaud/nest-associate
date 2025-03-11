import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect([
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Test' },
        { id: '3', name: 'Super' },
      ]);
  });

  it('/users/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/1')
      .expect(200)
      .expect({ id: '1', name: 'John Doe' });
  });

  it('/users/:id (GET) - Not Found', () => {
    return request(app.getHttpServer()).get('/users/999').expect(404);
  });
});
