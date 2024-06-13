import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { Repository, createQueryBuilder } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { Admin } from "../entities/admin.entity";
import { CreateAdminDto } from "../dto/create-admin.dto";
import { UpdateAdminDto } from "../dto/update-admin.dto";

@Injectable()
export class AdminService {

    private readonly logger = new Logger('CUstomerService');

    constructor(
        @InjectRepository(Admin)
        private readonly AdminRepository:Repository<Admin>,
        private readonly jwtService: JwtService,
    ){}

    async create(CreateCustomerDto: CreateAdminDto){
        try{
            const {password, ...userData} = CreateCustomerDto;

            CreateCustomerDto.password = bcrypt.hashSync(CreateCustomerDto.password, 10);

            const customer = await this.AdminRepository.create(CreateCustomerDto);

            await this.AdminRepository.save(customer);

            return {
                ...customer,
                token : this.jwtService.sign({id: customer.id})
            }

        }catch(error){
            throw this.handleDBErrors(error)
        }

        
    }

    async findAllCustomers(){
        return this.AdminRepository.find();
    }

    async findOne(id:string){
        const customer = await this.AdminRepository.findOneBy({id})
        if(!customer)
           throw new NotFoundException()
        
        return customer;
    }

    async update(id:string, updateCustomerDto:UpdateAdminDto){
        const customer = await this.AdminRepository.preload({
            id:id,
            ...updateCustomerDto
        })

        if (!customer) throw new NotFoundException(`Customer with id: ${ id } not found`);

        try {
            await this.AdminRepository.save( customer);
            return customer;
            
          } catch (error) {
            this.handleDBExceptions(error);
        } 

    }

    async remove(id:string){
        const customer = await this.findOne(id)
        await this.AdminRepository.remove(customer)
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