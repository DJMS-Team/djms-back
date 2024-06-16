import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PageOptionsDto } from '../pagination/page-options.dto';
import { PageDto } from '../pagination/page.dto';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '../decorators/api-paginated-response.decorator';

//El api bearer auth sirve para que nos muestre que todas estas rutas estan protegidas por el jwt
//@ApiBearerAuth()
@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto){
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiPaginatedResponse(User)
  findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<User>>{
    return this.usersService.findAll(pageOptionsDto)
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
