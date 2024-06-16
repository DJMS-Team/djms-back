import { IsNumber, IsOptional, IsString } from "class-validator";
import { Size } from "../entities/sizes.enum";

export class CreateProductDto{

    @IsString()
    product_name:string;

    @IsString()
    @IsOptional()
    description:string;

    @IsNumber()
    price:number

    @IsString()
    photo_url:string;

    @IsString()
    product_category_id:string;

    @IsString()
    @IsOptional()
    size:Size;

}