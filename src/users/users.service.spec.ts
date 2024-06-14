import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './services/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';


describe('UsersService', () => {

  let service: UsersService;
  let userRepositoryMock: Partial<Record<keyof Repository<User>, jest.Mock>>;
  
  beforeEach(async () => {
    userRepositoryMock = {
      create: jest.fn((userDto) => ({
             id: 'u' + Math.floor(Math.random() * 100),
             ...userDto
         })),
       save: jest.fn(),
       find: jest.fn(),
       findOne: jest.fn(),
       preload: jest.fn(),
       delete: jest.fn(),
     };
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
