import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Address } from '../address/entities/address.entity';
import { Order } from '../orders/entities/order.entity';
import { Inventory } from '../inventories/entities/inventory.entity';
import { Comment } from '../resources/entities/comment.entity';
import { ConfigModule } from '@nestjs/config';
import { Role } from '../roles/entities/roles.entity';
import { JwtService } from '@nestjs/jwt';
import { RolesModule } from 'src/roles/roles.module';
import { Repository } from 'typeorm';

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtService, Repository],
  exports: [UsersService, UsersModule, TypeOrmModule],
  imports: [forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Address, Role, Order, Comment, Inventory, User]), 
    ConfigModule
  ]
})
export class UsersModule {}
