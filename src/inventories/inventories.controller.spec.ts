import { Test, TestingModule } from '@nestjs/testing';
import { InventoriesController } from './inventories.controller';
import { InventoriesService } from './inventories.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

describe('InventoriesController', () => {
  let controller: InventoriesController;
  let service: InventoriesService;

  const mockInventoriesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    addProduct: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoriesController],
      providers: [
        {
          provide: InventoriesService,
          useValue: mockInventoriesService,
        },
      ],
    }).compile();

    controller = module.get<InventoriesController>(InventoriesController);
    service = module.get<InventoriesService>(InventoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new inventory', async () => {
      const createInventoryDto: CreateInventoryDto = { user_id: '1', quantity: 10 };
      const result = { id: '1', quantity: 10, user: {}, products: [] };

      mockInventoriesService.create.mockResolvedValue(result);

      expect(await controller.create(createInventoryDto)).toEqual(result);
      expect(mockInventoriesService.create).toHaveBeenCalledWith(createInventoryDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of inventories', async () => {
      const result = [{ id: '1', quantity: 10, user: {}, products: [] }];

      mockInventoriesService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(mockInventoriesService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an inventory by ID', async () => {
      const result = { id: '1', quantity: 10, user: {}, products: [] };

      mockInventoriesService.findOne.mockResolvedValue(result);

      expect(await controller.findOne('1')).toEqual(result);
      expect(mockInventoriesService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update an inventory', async () => {
      const updateInventoryDto: UpdateInventoryDto = { quantity: 20 };
      const result = { id: '1', quantity: 20, user: {}, products: [] };

      mockInventoriesService.update.mockResolvedValue(result);

      expect(await controller.update('1', updateInventoryDto)).toEqual(result);
      expect(mockInventoriesService.update).toHaveBeenCalledWith('1', updateInventoryDto);
    });
  });

  describe('remove', () => {
    it('should remove an inventory', async () => {
      mockInventoriesService.remove.mockResolvedValue(undefined);

      expect(await controller.remove('1')).toBeUndefined();
      expect(mockInventoriesService.remove).toHaveBeenCalledWith('1');
    });
  });

  describe('addProduct', () => {
    it('should add a product to an inventory', async () => {
      const result = { id: '1', quantity: 10, user: {}, products: [{ id: '1' }] };

      mockInventoriesService.addProduct.mockResolvedValue(result);

      expect(await controller.addProduct('1', '1')).toEqual(result);
      expect(mockInventoriesService.addProduct).toHaveBeenCalledWith('1', '1');
    });
  });
});
