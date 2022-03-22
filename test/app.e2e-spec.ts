import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('GET /users should return users', async () => {
    const res = await request(app.getHttpServer())
      .get('/users');

    expect(res.status).toBe(200);
  });

  it('GET /users send fake data should return users', async () => {
    const res = await request(app.getHttpServer())
      .get('/users').send({ user_id: 2 });

    expect(res.status).toBe(200);
  });

  it('DELETE /users send user that is not in database should return 404 user not found user', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/users?user_id=${2}`).send();

    expect(res.status).toBe(404);
  });

  it('DELETE /users send user that is in database should return deleted user', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/users?user_id=${173401189}`).send();

    expect(res.status).toBe(200);
  });

  it('DELETE /users send empty user_id should return deleted user', async () => {
    const res = await request(app.getHttpServer())
      .delete('/users?user_id=').send();

    expect(res.status).toBe(400);
  });

  it('DELETE /users send user_id that is not number should return deleted user', async () => {
    const res = await request(app.getHttpServer())
      .delete('/users?user_id=askjdkasdka').send();

    expect(res.status).toBe(400);
  });

  it('DELETE /users send without user_id should return deleted user', async () => {
    const res = await request(app.getHttpServer())
      .delete('/users?').send();

    expect(res.status).toBe(400);
  });

  it('POST /users/send-message send user_id that is not in database should return 404 not found user', async () => {
    const res = await request(app.getHttpServer())
      .post('/users/send-message').send({
        chat_id: 221063859,
        message: 'пасиба',
      });

    expect(res.status).toBe(404);
  });

  it('POST /users/send-message send user_id that is in database should return 200 and message was sent', async () => {
    const res = await request(app.getHttpServer())
      .post('/users/send-message').send({
        chat_id: 1548086450,
        message: 'пасиба',
      });

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({ data: 'message was sent' });
  });

  it('POST /users/send-message send without message should return 400 message is required', async () => {
    const res = await request(app.getHttpServer())
      .post('/users/send-message').send({
        chat_id: 1548086450,
      });

    expect(res.status).toBe(400);
  });

  it('POST /users/send-message send without chat_id should return 400 chat_id is required', async () => {
    const res = await request(app.getHttpServer())
      .post('/users/send-message').send({
        message: 'пасиба',
      });

    expect(res.status).toBe(400);
  });
});
