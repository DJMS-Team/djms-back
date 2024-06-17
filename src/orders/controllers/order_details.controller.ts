import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { OrderDetailService } from "../services/order_detail.service";
import { CreateOrderDetailDto } from "../dto/create-order_detail.dto";
import { UpdateOrderDetailDto } from "../dto/update_order_detail.dto";

@Controller('orderDetails')
export class OrderDetailController{
    constructor(
        private readonly orderDetailService: OrderDetailService
    ){}

    @Post()
    create(@Body() CreateOrderDetailDto: CreateOrderDetailDto ){
        return this.orderDetailService.create(CreateOrderDetailDto);
    }

    @Get()
    findAll(){
        return this.orderDetailService.find()
    }

    @Get(':id')
    findOne(@Param('id') id:string){
        return this.orderDetailService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id:string, @Body() UpdateOrderDetailDto: UpdateOrderDetailDto){
        return this.orderDetailService.update(id, UpdateOrderDetailDto);
    }

    @Delete(':id')
    remove(@Param('id') id:string){
        return this.orderDetailService.remove(id);
    }
}