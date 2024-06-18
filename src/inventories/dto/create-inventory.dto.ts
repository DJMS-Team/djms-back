import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { Product } from "src/products/entities/products.entity";

export class CreateInventoryDto {
    @IsNumber()
    quantity: number;

    @IsString()
    @IsUUID()
    user_id: string;
}
