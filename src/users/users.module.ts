import { Module, forwardRef } from '@nestjs/common';
import {UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';
import { Address } from './entities/address.entity';
import { Contact } from './entities/contact.entity';
import { Admin } from './entities/admin.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Inventory } from 'src/inventories/entities/inventory.entity';
import { Comment } from 'src/resources/entities/comment.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, UsersModule, TypeOrmModule],
  imports: [forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Address, Customer, Admin, Contact, Order, Comment, Inventory, User]), 
    ConfigModule
  ]
})
export class UsersModule {}
