import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './services/orders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { get } from 'http';
import { Order } from '../orders/entities/order.entity';
import { Product } from '../products/entities/products.entity';
import { Status } from './entities/status.enum';
import { User } from '../users/entities/user.entity';
import { PaymentMethod } from './entities/payment_method';

describe('UsersService', () => {
  let service: OrdersService;

  const mockUserRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(user => Promise.resolve({id: '1', ...user})),
    findOne: jest.fn().mockImplementation(id => {
      return {
        id: '1',
        Status: Status.SENDED,
        date: new Date('2024-06-16'),
        customer_id: '',
        payment_method_id: '',
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
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue:{}

        },
        {
          provide: getRepositoryToken(PaymentMethod),
          useValue:{}
        },
        JwtService,
       
        
       
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne',()=>{
    it('should find a user by id', async () => {
      const userDto = {Status: Status.SENDED,
        date: new Date('2024-06-16'),
        customer_id: '',
        payment_method_id: ''}
      
      expect(await service.findOne('1')).toEqual(
        {
          id: '1',
          ...userDto
        }
      );
    })
  })


  describe('findAll',()=>{
    it('should find all users', async () => {
      expect(await service.findAll()).toEqual([])
    })
  })

  describe('remove', () => {
    it('should remove a user', async () => {
      expect(await service.remove('1')).toEqual(undefined)
    })
  })

  describe('update',()=>{
    it('should update a user', async () => {
      const userDto = {status: Status.SENDED,
        date: new Date(),
        customer_id: '',
        payment_method_id: ''}
      expect(await service.update('1', userDto)).toEqual({
        id: '1',
        ...userDto
      })
    })
  })

  
 
});
