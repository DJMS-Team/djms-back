import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from './services/address.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { City } from './entities/city.entity';
import { User } from '../users/entities/user.entity';

describe('AddressService', () => {
  let service: AddressService;
  let repository: Repository<Address>;

  const mockAddressRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(address => Promise.resolve({id: '1', ...address})),
    findOne: jest.fn().mockImplementation(id => {
      return {
        id: '1',
        street: 'John Doe',
        house_number: '',
        user_id: '',
        city_id: ''
      }
    }),
    find: jest.fn().mockImplementation(() => {
      return []
    }),
    remove: jest.fn().mockImplementation(id => {
        return{
          id: id,
          street: 'John Doe',
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


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: getRepositoryToken(Address),
          useValue: mockAddressRepository,
        },
        {
          provide: getRepositoryToken(City),
          useValue: {}
        },
        {
          provide: getRepositoryToken(User),
          useValue: {}
        }
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    repository = module.get<Repository<Address>>(getRepositoryToken(Address));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return an address if found', async () => {
        const addressDto = {street:'John Doe', house_number:'', user_id:'', city_id:''}
      expect(await service.findOne('1')).toEqual(
        {
            id:'1',
            ...addressDto
        }
      );
    });
  });

  describe('findAll',()=>{
    it('should return all addresses if found', async () =>{
        expect(await service.findAll()).toEqual([])
    })
  })

  describe('update', ()=>{
    it('should return updated address if found', async ()=>{
        const addressDto = {street:'John Doe', house_number:'TestHouseNumber', user_id:'', city_id:''}
        expect(await service.update('1', addressDto)).toEqual({
            id:'1',
            ...addressDto
        })
    })
  })

  describe('delete',()=>{
    it('should remove a address', async () => {
        expect(await service.remove('1')).toEqual(undefined)
    })
  })
  

  // Añadir más pruebas para otros métodos según sea necesario
});
