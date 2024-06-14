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

import { ConfigModule } from '@nestjs/config';
import { Role } from 'src/roles/entities/roles.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, UsersModule, TypeOrmModule],
  imports: [forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Address, Role, Order, Comment, Inventory, User]), 
    ConfigModule
  ]
})
export class UsersModule {}
