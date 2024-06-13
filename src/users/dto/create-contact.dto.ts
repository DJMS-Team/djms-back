import { IsEmail, IsString } from "class-validator";


export class CreateContactDto {

    @IsString()
    @IsEmail()
    email:string;

    @IsString()
    phone_number:string;

    @IsString()
    customer_id:string;

}