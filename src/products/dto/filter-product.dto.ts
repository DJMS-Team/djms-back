import { IsOptional, IsString, IsNumber } from 'class-validator';

export class FilterProductsDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber()
  priceMin?: number;

  @IsOptional()
  @IsNumber()
  priceMax?: number;

  @IsOptional()
  @IsString()
  size?: string;
}
