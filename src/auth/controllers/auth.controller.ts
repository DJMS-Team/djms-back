import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  create(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  
}
