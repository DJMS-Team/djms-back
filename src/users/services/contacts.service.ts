import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Contact } from "../entities/contact.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateContactDto } from "../dto/create-contact.dto";
import { UpdateContactDto } from "../dto/update-contact.dto";
import { CustomerService } from "./customers.service";

@Injectable()
export class ContactService {

    private readonly logger = new Logger('ContactService');

    constructor(
        @InjectRepository(Contact)
        private readonly ContactRepository: Repository<Contact>,
        private readonly customerService : CustomerService
    ){}


    async create(createContactDto: CreateContactDto){
        const contact = this.ContactRepository.create(createContactDto);
        const customer = await this.customerService.findOne(createContactDto.customer_id);
        contact.customer = customer;
        await this.ContactRepository.save(contact);
        return contact;
    }

    async findAll(){
        return await this.ContactRepository.find()
    }

    async findOne(id:string){
        const contact = this.ContactRepository.findOneBy({id})
        return contact;
    }

    async findByEmail(email:string){
        const contact = this.ContactRepository.findOneBy({email})
        return contact;
    }

    async update(id:string, updateDto:UpdateContactDto){
        const contact = await this.ContactRepository.preload({
            id: id,
            ...updateDto 
        })

        if( !contact ) throw new NotFoundException(`Contact with id: ${ id } not found`);

        try {
            await this.ContactRepository.save( contact );
            return contact;
            
          } catch (error) {
            this.handleDBExceptions(error);
        } 
    }

    async remove(id: string) {
        const client = await this.findOne(id);
        await this.ContactRepository.remove(client);
    }

    private handleDBExceptions( error: any ) {

        if ( error.code === '23505' )
          throw new BadRequestException(error.detail);
        
        this.logger.error(error)
        throw new InternalServerErrorException('Unexpected error, check server logs');
    
    }

}