import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { PaymentMethod } from '../entities/payment_method';

@Injectable()
export class OrdersService {

  private readonly logger = new Logger('OrderService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PaymentMethod)
    private readonly paymentRepository: Repository<PaymentMethod>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ){}

  async create(createOrderDto: CreateOrderDto) {
    const order = this.orderRepository.create(createOrderDto);

    const user = await this.userRepository.findOneBy({id:createOrderDto.customer_id})

    if(!user) throw new NotFoundException(`user with id ${createOrderDto.customer_id} doesn't exist`)

    const payment_method = await this.paymentRepository.findOneBy({id:createOrderDto.payment_method_id})

    if(!payment_method) throw new NotFoundException(`payment method with id ${createOrderDto.payment_method_id} doesn't exist`)

    order.customer = user;
    order.payment_method = payment_method;


    await this.orderRepository.save(order)

    return order;
  }

  async findAll() {
    return await this.orderRepository.find()
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOne({where:{id:id}});
    if(!order) throw new NotFoundException(`the order with ${id} not found`)
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.preload({
      id:id,
      ...updateOrderDto
    })

    if(!order) throw new NotFoundException(`order with id ${id} doesn't exist`)

    try{
      await this.orderRepository.save(order)
      return order;
    }catch(error){

    }
  }

  async remove(id: string) {
    const order = await this.findOne(id)

    await this.orderRepository.remove(order)
  }
}
