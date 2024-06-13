import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { IsEmail } from "class-validator";
import { AdminService } from "../services/admin.service";
import { CreateAdminDto } from "../dto/create-admin.dto";
import { UpdateAdminDto } from "../dto/update-admin.dto";


@Controller('customer')
export class CustomerController{

    constructor(
        private readonly adminService:AdminService
    ){}

    @Post()
    create(@Body() createClientDto: CreateAdminDto) {
      return this.adminService.create(createClientDto);
    }
  
    @Get()
    findAll() {
      return this.adminService.findAllCustomers();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.adminService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateClientDto: UpdateAdminDto) {
      return this.adminService.update(id, updateClientDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.adminService.remove(id);
    }

}