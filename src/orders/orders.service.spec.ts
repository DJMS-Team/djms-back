import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './services/orders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Order } from '../orders/entities/order.entity';
import { Product } from '../products/entities/products.entity';
import { Status } from './entities/status.enum';
import { User } from '../users/entities/user.entity';
import { PaymentMethod } from './entities/payment_method';
import { Address } from '../address/entities/address.entity';

describe('OrdersService', () => {
  let service: OrdersService;

  const mockOrderRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(order => Promise.resolve({ id: '1', ...order })),
    findOne: jest.fn().mockImplementation(id => {
      return {
        id: '1',
        status: Status.SENDED,
        date: new Date('2024-06-16'),
        customer_id: '',
        seller_id: '',
        payment_method_id: '',
        address_id: '',
      };
    }),
    find: jest.fn().mockImplementation(() => {
      return [];
    }),
    remove: jest.fn().mockImplementation(id => {
      return {
        id: id,
        name: 'John Doe',
      };
    }),
    update: jest.fn().mockImplementation((id, dto) => {
      return {
        id: id,
        ...dto
      };
    }),
    preload: jest.fn().mockImplementation(order => Promise.resolve({ ...order }))
  };

  const mockUserRepository = {};
  const mockPaymentMethodRepository = {};
  const mockAddressRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockOrderRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(PaymentMethod),
          useValue: mockPaymentMethodRepository,
        },
        {
          provide: getRepositoryToken(Address),
          useValue: mockAddressRepository,
        },
        JwtService,
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should find an order by id', async () => {
      const orderDto = {
        status: Status.SENDED,
        date: new Date('2024-06-16'),
        customer_id: '',
        seller_id: '',
        payment_method_id: '',
        address_id: ''
      };

      expect(await service.findOne('1')).toEqual({
        id: '1',
        ...orderDto
      });
    });
  });

  describe('remove', () => {
    it('should remove an order', async () => {
      expect(await service.remove('1')).toEqual(undefined);
    });
  });

  describe('update', () => {
    it('should update an order', async () => {
      const orderDto = {
        status: Status.SENDED,
        date: new Date(),
        customer_id: '',
        seller_id: '',
        payment_method_id: '',
        address_id: '',
      };
      expect(await service.update('1', orderDto)).toEqual({
        id: '1',
        ...orderDto
      });
    });
  });
});
