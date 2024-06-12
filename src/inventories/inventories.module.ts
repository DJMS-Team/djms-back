import { Module } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { InventoriesController } from './inventories.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { Product } from './entities/product.entity';
import { ProductType } from './entities/product.enum';
import { product_type } from './entities/ProductType.entity';
import { OrderDetail } from '../orders/entities/order_detail.entity';
import { Review } from '../resources/entities/review.entity';
import { Comment } from '../resources/entities/comment.entity';
import { Customer } from '../auth/entities/customer.entity';
import { Admin } from '../auth/entities/admin.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Inventory]),
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([product_type]),
    TypeOrmModule.forFeature([OrderDetail]),
    TypeOrmModule.forFeature([Review]),
    TypeOrmModule.forFeature([Comment]),
    TypeOrmModule.forFeature([Customer]),
    TypeOrmModule.forFeature([Admin])
  ],
  controllers: [InventoriesController],
  providers: [InventoriesService],
  exports: [InventoriesModule, TypeOrmModule]
})
export class InventoriesModule {}
