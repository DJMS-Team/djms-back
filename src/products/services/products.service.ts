import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/products.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductCategory } from '../entities/product-category.entity';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Review } from '../../resources/entities/review.entity';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductService');

  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>
  ) {}


  async create(createProductDto:CreateProductDto): Promise<Product>{
    try{
      const product = this.productsRepository.create(createProductDto);
      product.product_category = await this.productCategoryRepository.findOneBy({id:createProductDto.product_category_id});
      await this.productsRepository.save(product);
      return product;
    }catch(error){
      this.handleDBErrors(error)
    }
  }

  async find(){
    return await this.productsRepository.find({relations: ['reviews']});
  }
  
  async findOne(id:string){
    const product = await this.productsRepository.findOne(
      {where: {id:id},
      relations: ['reviews']
    }
    );
    if(!product) throw new NotFoundException(`product with id ${id} doesn't exist`)
    return product;
  }

  async update(id:string, updateProductDto: UpdateProductDto){
    const product = await this.productsRepository.preload({
     id:id,
      ...updateProductDto
    })

    if(!product) throw new NotFoundException(`product with id ${id} doesn't exist`)

    try{
      await this.productsRepository.save(product);
      return product;
    }catch(error){
       this.handleDBExceptions(error);
    }
  }

  async calculateTotalScore(id:string){
    const reviews:Review[] = (await this.findOne(id)).reviews
    let Score:number;
    reviews.forEach((review) =>
      Score += review.score
    )
    
    const amountReviews = reviews.length;
    return Score/amountReviews;
  }

  async remove(id:string){
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
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
