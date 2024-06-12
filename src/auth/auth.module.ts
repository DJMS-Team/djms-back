import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Admin } from './entities/admin.entity';
import { Contact } from './entities/contact.entity';
import { Customer } from './entities/customer.entity';
import { Order } from '../orders/entities/order.entity';
import { Comment } from '../resources/entities/comment.entity';
import { Inventory } from '../inventories/entities/inventory.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Address]),
    TypeOrmModule.forFeature([Admin]),
    TypeOrmModule.forFeature([Contact]),
    TypeOrmModule.forFeature([Customer]),
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([Comment]),
    TypeOrmModule.forFeature([Inventory])

  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthModule, TypeOrmModule]
})
export class AuthModule {}
