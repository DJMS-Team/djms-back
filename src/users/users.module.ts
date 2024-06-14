import { Module, forwardRef } from '@nestjs/common';
import {UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Address } from 'src/address/entities/address.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Inventory } from 'src/inventories/entities/inventory.entity';
import { Comment } from 'src/resources/entities/comment.entity';
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
