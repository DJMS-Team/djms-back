import { IsDate, IsNumber, IsString } from "class-validator";
import { Status } from "../entities/status.enum";

export class CreateOrderDto {
    @IsString()
    status:Status;

    @IsDate()
    date:Date;

    @IsString()
    customer_id:string;

    @IsString()
    payment_method_id:string;

}
