import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  const mockUsers = [{id: 1, name: 'John Doe', email: '', password: '', photo_url: '', role_id: ''}]

  const mockUsersRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((user) => Promise.resolve({id: '1', ...user})),
    find: jest.fn().mockResolvedValue(mockUsers)
  } 
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideProvider(getRepositoryToken(User)).useValue(mockUsersRepository).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(mockUsers)

      
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({name: 'John Doe', email: 'juan@juan.com', password: 'Juan123456.', photo_url: '', role_id: 'd5f7f630-bf55-4e0b-bb09-107e0411d1de'})
      .expect('Content-Type', /json/)
      .expect(201)
      
  })

  it('/users (POST) --> 400 on validation error', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({name: 12331231})
      .expect('Content-Type', /json/)
      .expect(400)
      
  })

});