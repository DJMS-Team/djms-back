import { Body, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ContactService } from "../services/contacts.service";
import { CreateContactDto } from "../dto/create-contact.dto";
import { UpdateContactDto } from "../dto/update-contact.dto";


export class ContactController{

    constructor(
        private readonly contactService:ContactService
    ){}

    @Post()
    create(@Body() createClientDto: CreateContactDto) {
      return this.contactService.create(createClientDto);
    }
  
    @Get()
    findAll() {
      return this.contactService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.contactService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateClientDto: UpdateContactDto) {
      return this.contactService.update(id, updateClientDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.contactService.remove(id);
    }

}