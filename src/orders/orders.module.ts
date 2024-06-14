import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/order_detail.entity';
import { PaymentMethod } from './entities/payment_method';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/products.entity';

@Module({
  imports:[
    ConfigModule,
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([OrderDetail]),
    TypeOrmModule.forFeature([PaymentMethod]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Product])

  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
