import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from 'src/users/services/users.service';
import { ProductsService } from './services/products.service';
import { ProductCategoryService } from './services/product-category.service';
import { ProductCategoryController } from './controllers/product-category.controller';
import { ProductCategory } from './entities/product-category.entity';

@Module({
  controllers: [ProductCategoryController],
  providers: [ProductsService, UsersService, ProductCategoryService],
  exports: [ProductCategoryModule, TypeOrmModule],
  imports: [
    TypeOrmModule.forFeature([ProductCategory]), 
    ConfigModule
  ]
})
export class ProductCategoryModule {}

