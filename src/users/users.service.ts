import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';

import { Product } from '../products/entities/products.entity';

import { Status } from '../orders/entities/status.enum';
import { Order } from '../orders/entities/order.entity';



@Injectable()
export class UsersService {

  private readonly logger = new Logger('UserService');

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly jwtService: JwtService,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

  ) {}

  async create(createUserDto: CreateUserDto) {
    try {

      const { password, ...userData } = createUserDto;
      
      const user = this.usersRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
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
    const user = await this.usersRepository.find({relations:['addresses']});
    return user;
  }

  async findOne(id:string){
    const user = await this.usersRepository.findOne({
      where: {id},
      relations: ['addresses']
    })
    return user;
  }

  async findOldOrders(id:string){
    const user = await this.usersRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const receivedOrders = await this.orderRepository.find({
      where: {
        customer: user,
        status: Status.RECEIVED,
      },
      relations: ['customer', 'payment_method', 'order_details'], // Add all necessary relations
    });

    return receivedOrders;
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

  async addFavoriteProduct(userId: string, productId: string) {
    try{
      const user = await this.usersRepository.findOne({
        where: { id: userId },
        relations: ["favorites"]
      });

      const product = await this.productsRepository.findOne({
        where: { id: productId }
      });

      if (!product) throw new NotFoundException('Product not found');

      user.favorites.push(product);
      await this.usersRepository.save(user);
      return user;

    }catch(error){
      this.handleDBExceptions(error);
    }
  }

  async getFavoriteProducts(id: string) {
    try{
      const userWithFavorites = await this.usersRepository.findOne({
        where: { id: id },
        relations: ["favorites"] 
      });
      return userWithFavorites.favorites;

    }catch(error){
      this.handleDBExceptions(error);
    }
  }


  private handleDBErrors( error: any ): never {


    if ( error.code === '23505' ) 
      throw new BadRequestException( error.detail );

    if (error instanceof NotFoundException) {
      throw error;
    }

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
