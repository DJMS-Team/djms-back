import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAdminDto extends PartialType(CreateCustomerDto) {
    @IsString()
    @IsOptional()
    readonly id: string
}
