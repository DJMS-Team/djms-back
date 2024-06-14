import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Product } from './entities/products.entity';
import { UsersService } from 'src/users/services/users.service';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { ProductCategoryService } from './services/product-category.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, UsersService, ProductCategoryService],
  exports: [ProductsModule, TypeOrmModule],
  imports: [
    TypeOrmModule.forFeature([Product]), 
    ConfigModule
  ]
})
export class ProductsModule {}

