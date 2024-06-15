import { IsBoolean, IsString } from "class-validator";

export class CreateCommentDto {

    @IsString()
    description:string;

    @IsBoolean()
    is_question:boolean;

    @IsString()
    user_id:string;

    @IsString()
    product_id:string;

    @IsString()
    review_id:string;


}
