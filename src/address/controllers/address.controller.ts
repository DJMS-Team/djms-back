import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AddressService } from '../services/address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
}
