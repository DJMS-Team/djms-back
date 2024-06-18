import { Body, Controller, Post } from "@nestjs/common";
import { PaymentService } from "../services/payment_method.service";
import { CreatePaymentDto } from "../dto/create-payment.dto";

@Controller('payment_method')
export class PaymentController{
    constructor(
        private readonly paymentService: PaymentService
    ){}

    @Post()
    create(@Body() createPaymentDto: CreatePaymentDto){
        return this.paymentService.create(createPaymentDto)
    }

}