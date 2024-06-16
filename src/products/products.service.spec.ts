import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './services/products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Product } from './entities/products.entity';
import { ProductCategory } from './entities/product-category.entity';
import { Size } from './entities/sizes.enum';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockProductRepository = {
    create: jest.fn().mockImplementation(product => Promise.resolve({id: '1', ...product})),
    save: jest.fn().mockImplementation(product => Promise.resolve({id: '1', ...product})),
    findOne: jest.fn().mockImplementation(id => {
      return {
        id: '1',
        product_name: 'John Doe',
        description: '123',
        price: 10,
        photo_url: '',
        product_category_id: '2'
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

  const mockProductCategoryRepository = {
    findOneBy: jest.fn().mockImplementation(id => {
        return {
            id: id,

        }
    })
  }
  

  beforeEach(async () => {
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
        {
          provide: getRepositoryToken(ProductCategory),
          useValue: mockProductCategoryRepository,
        },
        JwtService,
       
        
       
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product record and return that', async () => {
    const productDto = {
        product_name: 'John Doe',
        description: '123',
        price: 10,
        photo_url: '',
        product_category_id: '2',
        size: Size.M
    }
    expect(await service.create(productDto))
    .toEqual({
      id: '1',
      ...productDto
    })

    expect(mockProductRepository.create).toHaveBeenCalledWith(productDto)
  })

  it('should find a product by id', async () => {
   const productDto = {
        product_name: 'John Doe',
        description: '123',
        price: 10,
        photo_url: '',
        product_category_id: '2'
    }
    expect(await service.findOne('1')).toEqual(
      {
        id: '1',
        ...productDto
      }
    );
  })

  it('should find all products', async () => {
    // expect(await service.find()).toEqual([])
  })

  it('should remove a product', async () => {
    expect(await service.remove('1')).toEqual(undefined)
  })

  it('should update a product', async () => {
    const productDto = {
        product_name: 'John Doe',
        description: '123',
        price: 10,
        photo_url: '',
        product_category_id: '2'
    }
    expect(await service.update('1', productDto)).toEqual({
      id: '1',
      ...productDto
    })
  })
 
});
