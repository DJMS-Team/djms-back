import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
    @IsNumber()
    status:number;

    @IsDate()
    date:Date;

    @IsString()
    customer_id:string;

    @IsString()
    payment_method_id:string;

}
