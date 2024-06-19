import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { Product } from '../../products/entities/products.entity';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    
    const { product_id, user_id, ...content } = createCommentDto;
    const product = await this.productRepository.findOneBy({ id: product_id });
    
    if (!product) {
      throw new NotFoundException(`Product with ID "${product_id}" not found`);
    }
    const user = await this.userRepository.findOneBy({ id: user_id });
    if (!user) {
      throw new NotFoundException(`User with ID "${user_id}" not found`);
    }

    const comment = this.commentRepository.create(createCommentDto);
    comment.product = product;
    comment.customer = user;
    return await this.commentRepository.save(comment);
    return null;
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find({ relations: ['product', 'user', 'review'] });
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id }, relations: ['product', 'user', 'review'] });
    if (!comment) {
      throw new NotFoundException(`Comment with ID "${id}" not found`);
    }
    return comment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.commentRepository.preload({ id, ...updateCommentDto });
    if (!comment) {
      throw new NotFoundException(`Comment with ID "${id}" not found`);
    }
    return this.commentRepository.save(comment);
  }

  async remove(id: string): Promise<void> {
    const comment = await this.findOne(id);
    await this.commentRepository.remove(comment);
  }
}
