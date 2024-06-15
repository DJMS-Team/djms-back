import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './orders.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/order_detail.entity';
import { PaymentMethod } from './entities/payment_method';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/products.entity';
import { Repository } from 'typeorm';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[
    ConfigModule,
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([OrderDetail]),
    TypeOrmModule.forFeature([PaymentMethod]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Product]),
    Repository, 
    UsersModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersModule, TypeOrmModule, Repository, OrdersService]
})
export class OrdersModule {}
