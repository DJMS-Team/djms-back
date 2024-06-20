import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto{

    @IsString()
    product_name:string;

    @IsString()
    @IsOptional()
    description:string;

    @IsNumber()
    price: number;

    @IsNumber()
    quantity: number;

    @IsString()
    photo_url:string;

    @IsString()
    product_category_id:string;
}