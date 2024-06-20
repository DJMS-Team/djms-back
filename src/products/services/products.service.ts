import { Injectable, BadRequestException, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/products.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductCategory } from '../entities/product-category.entity';
import { Review } from '../../resources/entities/review.entity';
import { PageOptionsDto } from '../../pagination/page-options.dto';
import { PageDto } from '../../pagination/page.dto';
import { PageMetaDto } from '../../pagination/page-meta.dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductService');

  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const product_category = await this.productCategoryRepository.findOneBy({ id: createProductDto.product_category_id });

      const product = this.productsRepository.create(createProductDto);
      product.product_category = product_category;
      await this.productsRepository.save(product);

      return product;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async find(pageOptionsDto: PageOptionsDto):Promise<PageDto<Product>>{
    const [data, itemCount] = await this.productsRepository.findAndCount({
      relations: ['reviews'],
      take: pageOptionsDto.take,
      skip: pageOptionsDto.skip,
      order:{
        id: pageOptionsDto.order
      }
    });
    
    const pageMetaDto = new PageMetaDto({pageOptionsDto, itemCount})
    return new PageDto(data, pageMetaDto)
  }

  async findFiltered(filters: any): Promise<Product[]> {
    const queryBuilder = this.productsRepository.createQueryBuilder('product');
    queryBuilder.leftJoinAndSelect('product.reviews', 'reviews');
    queryBuilder.leftJoinAndSelect('product.product_category', 'product_category');

    if (filters.category) {
      queryBuilder.andWhere('product_category.category = :category', { category: filters.category });
    }

    if (filters.priceMin !== undefined) {
      queryBuilder.andWhere('product.price >= :priceMin', { priceMin: filters.priceMin });
    }

    if (filters.priceMax !== undefined) {
      queryBuilder.andWhere('product.price <= :priceMax', { priceMax: filters.priceMax });
    }

    if (filters.size) {
      queryBuilder.andWhere('product.size = :size', { size: filters.size });
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id: id }, relations: ['reviews', 'product_category'] });
    if (!product) throw new NotFoundException(`Product with id ${id} doesn't exist`);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productsRepository.preload({
      id: id,
      ...updateProductDto,
    });

    if (!product) throw new NotFoundException(`Product with id ${id} doesn't exist`);

    try {
      await this.productsRepository.save(product);
      return product;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async calculateTotalScore(id: string): Promise<number> {
    const reviews: Review[] = (await this.findOne(id)).reviews;
    let score: number = 0;
    reviews.forEach((review) => (score += review.score));

    const amountReviews = reviews.length;
    return score / amountReviews;
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
  }

  private handleDBErrors(error: any): never {
    if (error instanceof BadRequestException) {
      throw error;
    }

    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Please check server logs');
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
