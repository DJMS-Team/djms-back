import { IsString } from "class-validator";


export class CreateOrderDetailDto {

    @IsString()
    quantity:string;

    @IsString()
    order_id:string;

    @IsString()
    product_id:string;

}