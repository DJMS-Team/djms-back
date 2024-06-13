import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CustomerService } from "../services/customers.service";
import { CreateCustomerDto } from "../dto/create-customer.dto";
import { UpdateCustomerDto } from "../dto/update-customer.dto";
import { IsEmail } from "class-validator";


@Controller('customer')
export class CustomerController{

    constructor(
        private readonly customerService:CustomerService
    ){}

    @Post()
    create(@Body() createClientDto: CreateCustomerDto) {
      return this.customerService.create(createClientDto);
    }
  
    @Get()
    findAll() {
      return this.customerService.findAllCustomers();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.customerService.findOne(id);
    }


    @Get('email/:email')
    findOneByEmail(@Param('email') email:string){
        return this.customerService.findOneByEmail(email);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateClientDto: UpdateCustomerDto) {
      return this.customerService.update(id, updateClientDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.customerService.remove(id);
    }

}