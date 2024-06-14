import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto){
    try{
      const {password, ...userData} = createUserDto;
      createUserDto.password = bcrypt.hashSync(createUserDto.password,10);

      const user = await this.usersRepository.create(createUserDto);

      await this.usersRepository.save(user);

      return{
        ...user,
        token: this.jwtService.sign({id:user.id})
      };

    }catch(error){
      this.handleDBErrors(error);
    }
  }

  async findByEmail(email: string) {
    const user: User = await this.usersRepository.findOne({
      where: { email }
    })
    
    if (!user) {
      throw new NotFoundException('Email not found, please register or try again.')
    }
    
    return user;
  }

  private handleDBErrors( error: any ): never {


    if ( error.code === '23505' ) 
      throw new BadRequestException( error.detail );

    console.log(error)

    throw new InternalServerErrorException('Please check server logs');

  }
}
