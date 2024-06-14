import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/roles.entity';
import { User } from 'src/users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesModule, TypeOrmModule],
  imports: [
    TypeOrmModule.forFeature([Role, User]), 
    ConfigModule
  ]
})
export class RolesModule {}

