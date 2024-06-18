import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/products.entity';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createInventoryDto: CreateInventoryDto): Promise<Inventory> {
    const { user_id, quantity } = createInventoryDto;

    const user = await this.userRepository.findOne({ where: { id: user_id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${user_id}" not found`);
    }

    const inventory = this.inventoryRepository.create({ quantity, user, products: [] });
    return this.inventoryRepository.save(inventory);
  }

  async findAll(): Promise<Inventory[]> {
    return this.inventoryRepository.find({ relations: ['user', 'products'] });
  }

  async findOne(id: string): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findOne({ where: { id }, relations: ['user', 'products'] });
    if (!inventory) {
      throw new NotFoundException(`Inventory with ID "${id}" not found`);
    }
    return inventory;
  }

  async update(id: string, updateInventoryDto: UpdateInventoryDto): Promise<Inventory> {
    const inventory = await this.findOne(id);
    Object.assign(inventory, updateInventoryDto);
    return this.inventoryRepository.save(inventory);
  }

  async remove(id: string): Promise<void> {
    const inventory = await this.findOne(id);
    await this.inventoryRepository.remove(inventory);
  }

  async addProduct(inventoryId: string, productId: string): Promise<Inventory> {
    const inventory = await this.findOne(inventoryId);
    const product = await this.productRepository.findOne({ where: { id: productId } });

    if (!product) {
      throw new NotFoundException(`Product with ID "${productId}" not found`);
    }

    inventory.products.push(product);
    return this.inventoryRepository.save(inventory);
  }
}