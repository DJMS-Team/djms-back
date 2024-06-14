import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { ConfigModule } from '@nestjs/config';
import { AddressService } from './services/address.service';
import { City } from './entities/city.entity';
import { Department } from './entities/department.entity';
import { CityService } from './services/city.service';
import { DepartmentService } from './services/department.service';
import { DepartmentController } from './controllers/department.controller';

@Module({
  controllers: [DepartmentController],
  providers: [AddressService, CityService, DepartmentService],
  exports: [DepartmentModule, TypeOrmModule],
  imports: [
    TypeOrmModule.forFeature([Address, City, Department]), 
    ConfigModule
  ]
})
export class DepartmentModule {}

