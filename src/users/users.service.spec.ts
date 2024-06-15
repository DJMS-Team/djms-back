import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { get } from 'http';

describe('UsersService', () => {
  let service: UsersService;

  const mockUserRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(user => Promise.resolve({id: '1', ...user})),
    findOne: jest.fn().mockImplementation(id => {
      return {
        id: '1',
        name: 'John Doe',
        password: '123',
        email: '',
        photo_url: '',
        role_id: ''
      }
    }),
    find: jest.fn().mockImplementation(() => {
      return []
    }),
    remove: jest.fn().mockImplementation(id => {
        return{
          id: id,
          name: 'John Doe',
        }
    }),
    update: jest.fn().mockImplementation((id, dto) => {
      return {
        id: id,
        ...dto
      }
    }),
    preload: jest.fn().mockImplementation(user => Promise.resolve({ ...user }))
  }

  const mockRoleRepository = {

  }
  

  beforeEach(async () => {
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        JwtService,
       
        
       
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a user by id', async () => {
    const userDto = {name: 'John Doe', password: '123', email: '', photo_url: '', role_id: ''}
    expect(await service.findOne('1')).toEqual(
      {
        id: '1',
        ...userDto
      }
    );
  })

  it('should find all users', async () => {
    expect(await service.findAll()).toEqual([])
  })

  it('should remove a user', async () => {
    expect(await service.remove('1')).toEqual(undefined)
  })

  it('should update a user', async () => {
    const userDto = {name: 'John Doe', password: '123', email: '', photo_url: '', role_id: ''}
    expect(await service.update('1', userDto)).toEqual({
      id: '1',
      ...userDto
    })
  })
 
});
