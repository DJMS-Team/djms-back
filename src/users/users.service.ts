import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../roles/entities/roles.entity';

@Injectable()
export class UsersService {

  private readonly logger = new Logger('UserService');

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    
    private readonly roleRepository:Repository<Role>,
    private readonly jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {

      const { password, ...userData } = createUserDto;
      
      const user = this.usersRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      // const role = await this.roleRepository.findOneBy({id:createUserDto.role_id});
      // user.role = role;
      await this.usersRepository.save( user )
      

      return user;
      

    } catch (error) {
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

  async findAll(){
    const user = await this.usersRepository.find();
    return user;
  }

  async findOne(id:string){
    const user = await this.usersRepository.findOne({
      where: {id}
    })
    return user;
  }

  async update(id:string, updateDto: UpdateUserDto){
    const user = await this.usersRepository.preload({
      id: id,
      ...updateDto
    })

    if(!user) throw new NotFoundException()

      try {
        await this.usersRepository.save( user );
        return user;
        
      } catch (error) {
        this.handleDBExceptions(error);
      }
  }

  async remove(id:string){
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }


  private handleDBErrors( error: any ): never {


    if ( error.code === '23505' ) 
      throw new BadRequestException( error.detail );

    console.log(error)

    throw new InternalServerErrorException('Please check server logs');

  }

  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}
