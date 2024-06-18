import { Test, TestingModule } from '@nestjs/testing';
import { InventoriesService } from './inventories.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/products.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockInventoryRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
});

const mockUserRepository = () => ({
  findOne: jest.fn(),
});

const mockProductRepository = () => ({
  findOne: jest.fn(),
});

describe('InventoriesService', () => {
  let service: InventoriesService;
  let inventoryRepository;
  let userRepository;
  let productRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoriesService,
        {
          provide: getRepositoryToken(Inventory),
          useFactory: mockInventoryRepository,
        },
        {
          provide: getRepositoryToken(User),
          useFactory: mockUserRepository,
        },
        {
          provide: getRepositoryToken(Product),
          useFactory: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<InventoriesService>(InventoriesService);
    inventoryRepository = module.get<Repository<Inventory>>(getRepositoryToken(Inventory));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    productRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new inventory', async () => {
      const createInventoryDto = { user_id: '1', quantity: 10 };
      const user = { id: '1' };
      const inventory = { id: '1', quantity: 10, user, products: [] };

      userRepository.findOne.mockResolvedValue(user);
      inventoryRepository.create.mockReturnValue(inventory);
      inventoryRepository.save.mockResolvedValue(inventory);

      expect(await service.create(createInventoryDto)).toEqual(inventory);
    });

    it('should throw a NotFoundException if user not found', async () => {
      const createInventoryDto = { user_id: '1', quantity: 10 };

      userRepository.findOne.mockResolvedValue(null);

      await expect(service.create(createInventoryDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of inventories', async () => {
      const inventory = [{ id: '1', quantity: 10, user: {}, products: [] }];
      inventoryRepository.find.mockResolvedValue(inventory);

      expect(await service.findAll()).toEqual(inventory);
    });
  });

  describe('findOne', () => {
    it('should return an inventory by ID', async () => {
      const inventory = { id: '1', quantity: 10, user: {}, products: [] };
      inventoryRepository.findOne.mockResolvedValue(inventory);

      expect(await service.findOne('1')).toEqual(inventory);
    });

    it('should throw a NotFoundException if inventory not found', async () => {
      inventoryRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an inventory', async () => {
      const updateInventoryDto = { quantity: 20 };
      const inventory = { id: '1', quantity: 10, user: {}, products: [] };
      const updatedInventory = { ...inventory, ...updateInventoryDto };

      service.findOne = jest.fn().mockResolvedValue(inventory);
      inventoryRepository.save.mockResolvedValue(updatedInventory);

      expect(await service.update('1', updateInventoryDto)).toEqual(updatedInventory);
    });
  });

  describe('remove', () => {
    it('should remove an inventory', async () => {
      const inventory = { id: '1', quantity: 10, user: {}, products: [] };

      service.findOne = jest.fn().mockResolvedValue(inventory);
      inventoryRepository.remove.mockResolvedValue(undefined);

      expect(await service.remove('1')).toBeUndefined();
    });
  });

  describe('addProduct', () => {
    it('should add a product to an inventory', async () => {
      const inventory = { id: '1', quantity: 10, user: {}, products: [] };
      const product = { id: '1' };
      const updatedInventory = { ...inventory, products: [product] };

      service.findOne = jest.fn().mockResolvedValue(inventory);
      productRepository.findOne.mockResolvedValue(product);
      inventoryRepository.save.mockResolvedValue(updatedInventory);

      expect(await service.addProduct('1', '1')).toEqual(updatedInventory);
    });

    it('should throw a NotFoundException if product not found', async () => {
      const inventory = { id: '1', quantity: 10, user: {}, products: [] };

      service.findOne = jest.fn().mockResolvedValue(inventory);
      productRepository.findOne.mockResolvedValue(null);

      await expect(service.addProduct('1', '1')).rejects.toThrow(NotFoundException);
    });
  });
});
