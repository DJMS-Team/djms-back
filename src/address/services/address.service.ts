import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from '../entities/address.entity';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-adress.dto';

@Injectable()
export class AddressService {

  private readonly logger = new Logger('AdressService');

  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>
  ) {}

  async create(createAddressDto: CreateAddressDto){
    const address = this.addressRepository.create(createAddressDto);

    await this.addressRepository.save(address);

    return address;
  }

  async find():Promise<Address[]>{
    const adress:Address[] = await this.addressRepository.find();

    return adress;

  }

  async findOne(id:string){
    const address = await this.addressRepository.findOneBy({id:id});
    return address;
  }

  async update(id:string, updateAddressDto: UpdateAddressDto){
    const address = await this.addressRepository.preload({
      id:id,
      ...updateAddressDto
    })

    if(!address) throw new NotFoundException(`The adress with ${id} doesn't exist`)

    try{
      await this.addressRepository.save(address)
      return address
    }catch(error){
      this.handleDBExceptions(error)
    }

    
  }

  async remove(id:string){
    const address = await this.findOne(id);
    await this.addressRepository.remove(address);
  }

  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
  
  

}
