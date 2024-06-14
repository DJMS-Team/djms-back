import { Module } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { InventoriesController } from './inventories.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { OrderDetail } from '../orders/entities/order_detail.entity';
import { Review } from '../resources/entities/review.entity';
import { Comment } from '../resources/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { ProductCategory } from 'src/products/entities/product-category.entity';
import { Product } from 'src/products/entities/products.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Inventory]),
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([ProductCategory]),
    TypeOrmModule.forFeature([OrderDetail]),
    TypeOrmModule.forFeature([Review]),
    TypeOrmModule.forFeature([Comment]),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [InventoriesController],
  providers: [InventoriesService],
  exports: [InventoriesModule, TypeOrmModule]
})
export class InventoriesModule {}
