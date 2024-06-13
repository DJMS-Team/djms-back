import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { User } from '../entities/user.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}




  async findByEmail(email: string) {
    const user: User = await this.usersRepository.findOne({
      where: { email }
    })
    
    if (!user) {
      throw new NotFoundException('Email not found, please register or try again.')
    }
    
    return user;
  }
}
