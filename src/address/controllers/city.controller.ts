import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CityService } from '../services/city.service';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}
}
