import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Product } from './entities/products.entity';
import { UsersService } from '../users/users.service';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { ProductCategoryService } from './services/product-category.service';
import { User } from '../users/entities/user.entity';
import { OrderDetail } from '../orders/entities/order_detail.entity';
import { Review } from '../resources/entities/review.entity';
import { ProductCategory } from './entities/product-category.entity';
import { Inventory } from '../inventories/entities/inventory.entity';
import { Comment } from '../resources/entities/comment.entity';
import { Repository } from 'typeorm';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, UsersService, ProductCategoryService, Repository],
  exports: [ProductsModule, TypeOrmModule, Repository],
  imports: [
    TypeOrmModule.forFeature([Product, User, OrderDetail, Review, ProductCategory, Inventory, Comment]), 
    ConfigModule, 
    Repository
  ]
})
export class ProductsModule {}

