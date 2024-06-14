import { Module, forwardRef } from '@nestjs/common';
import {UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';
import { Address } from './entities/address.entity';
import { Contact } from './entities/contact.entity';
import { Admin } from './entities/admin.entity';
import { Order } from '../orders/entities/order.entity';
import { Inventory } from '../inventories/entities/inventory.entity';
import { Comment } from '../resources/entities/comment.entity';
import { ConfigModule } from '@nestjs/config';
import { CustomerService } from './services/customers.service';
import { ContactService } from './services/contacts.service';
import { CustomerController } from './controllers/customer.controller';
import { ContactController } from './controllers/contact.controller';

@Module({
  controllers: [UsersController, CustomerController, ContactController],
  providers: [UsersService, CustomerService, ContactService],
  exports: [UsersService, UsersModule, TypeOrmModule],
  imports: [forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Address, Customer, Admin, Contact, Order, Comment, Inventory, User]), 
    ConfigModule
  ]
})
export class UsersModule {}
