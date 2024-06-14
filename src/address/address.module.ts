import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { User } from 'src/users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { AddressService } from './services/address.service';
import { AddressController } from './controllers/address.controller';
import { City } from './entities/city.entity';
import { Department } from './entities/department.entity';
import { CityService } from './services/city.service';
import { DepartmentService } from './services/department.service';

@Module({
  controllers: [AddressController],
  providers: [AddressService, CityService, DepartmentService],
  exports: [AddressModule, TypeOrmModule],
  imports: [
    TypeOrmModule.forFeature([Address, City, Department]), 
    ConfigModule
  ]
})
export class AddressModule {}

