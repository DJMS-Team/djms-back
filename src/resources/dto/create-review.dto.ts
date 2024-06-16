import { IsNumber, IsString } from "class-validator";

export class CreateReviewDto {
    
    @IsNumber()
    score:number;

    @IsString()
    user_id:string;

    @IsString()
    product_id:string;
}
