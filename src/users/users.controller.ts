import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto){
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(){
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id:string){
    return this.usersService.findOne(id);
  }

  @Get(':userId/orders/received')
  async getReceivedOrdersByUser(@Param('userId') userId: string) {
    return this.usersService.findOldOrders(userId);
  }

  @Patch(':id')
  update(@Param('id') id:string, @Body() updateDto: UpdateUserDto){
    return this.usersService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    return this.usersService.remove(id);
  }

  @Post(':id/favorite')
  addFavoriteProduct(@Param('id') id: string, @Body('product_id') product_id: string){
    return this.usersService.addFavoriteProduct(id, product_id);
  }
  
  @Get(':id/favorite')
  getFavorites(@Param('id') id: string){
    return this.usersService.getFavoriteProducts(id);
  }
}
