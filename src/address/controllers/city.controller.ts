import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CityService } from '../services/city.service';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  findAll(){
    return this.cityService.find()
  }

  @Get(':id')
  findOne(@Param('id') id:string){
    return this.cityService.findOne(id);
  }

}
