import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "../../users/entities/customer.entity";
import { Repository } from "typeorm";
import { CreateCustomerDto } from "src/users/dto/create-user.dto";



@Injectable()
export class AuthGoogleService {

    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>
    ){}

    async oAuthLogin(user) {

        if (!user) {
          throw new Error('User not found!!!');
        }
    
        const email = user.email

        const userExist = await this.customerRepository.findOne({
            where : {email},
            select : {id:true, email:true, password:true}
        })   

        if(!userExist){
            let customer = new CreateCustomerDto();
            customer.name = user.name;
            customer.email = user.email;
            customer.photo_url = user.picture;
            customer.password = process.env.GOOGlE_PASSWORD

            await this.customerRepository.save(customer)
        }

        const createdtUser = await this.customerRepository.findOne({
            where : {email},
            select : {id:true, email:true, password:true}
        })

        let payload;

        if(userExist){
            payload = {
              id : userExist.id,
              email: user.email,
              name: user.name,
            };
          }else{
            payload = {
              id : createdtUser.id,
              email: user.email,
              name: user.name,
            };
          }
    
          return {
            ...payload,
            token : this.jwtService.sign({id: payload.id})
          }
      }

}