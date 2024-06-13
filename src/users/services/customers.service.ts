import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { Customer } from "../entities/customer.entity";
import { Repository, createQueryBuilder } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCustomerDto } from "../dto/create-customer.dto";
import { UpdateCustomerDto } from "../dto/update-customer.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class CustomerService {

    private readonly logger = new Logger('CUstomerService');

    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository:Repository<Customer>,
        private readonly jwtService: JwtService,
    ){}

    async create(CreateCustomerDto: CreateCustomerDto){
        try{
            const {password, ...userData} = CreateCustomerDto;

            CreateCustomerDto.password = bcrypt.hashSync(CreateCustomerDto.password, 10);

            const customer = await this.customerRepository.create(CreateCustomerDto);

            await this.customerRepository.save(customer);

            return {
                ...customer,
                token : this.jwtService.sign({id: customer.id})
            }

        }catch(error){
            throw this.handleDBErrors(error)
        }

        
    }

    async findAllCustomers(){
        return this.customerRepository.find();
    }

    async findOne(id:string){
        const customer = await this.customerRepository.findOneBy({id})
        if(!customer)
           throw new NotFoundException()
        
        return customer;
    }

    async findOneByEmail(email:string){
        const customer = this.customerRepository.createQueryBuilder('customer').
                        innerJoin('customer.contacts', 'contact').
                        where('contact.email = :email', {email:email})
                        .getOne();
        return customer;
    }

    async update(id:string, updateCustomerDto:UpdateCustomerDto){
        const customer = await this.customerRepository.preload({
            id:id,
            ...updateCustomerDto
        })

        if (!customer) throw new NotFoundException(`Customer with id: ${ id } not found`);

        try {
            await this.customerRepository.save( customer);
            return customer;
            
          } catch (error) {
            this.handleDBExceptions(error);
        } 

    }

    async remove(id:string){
        const customer = await this.findOne(id)
        await this.customerRepository.remove(customer)
    }


    private handleDBExceptions( error: any ) {

        if ( error.code === '23505' )
          throw new BadRequestException(error.detail);
        
        this.logger.error(error)
        throw new InternalServerErrorException('Unexpected error, check server logs');
    
    }


    private handleDBErrors( error: any ): never {


        if ( error.code === '23505' ) 
          throw new BadRequestException( error.detail );
    
        console.log(error)
    
        throw new InternalServerErrorException('Please check server logs');
    
      }
}