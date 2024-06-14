import { Module } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { ResourcesController } from './resources.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Review } from './entities/review.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/products.entity';

@Module({
  imports:[
    ConfigModule,
    TypeOrmModule.forFeature([Comment]),
    TypeOrmModule.forFeature([Review]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Product])
  ],
  controllers: [ResourcesController],
  providers: [ResourcesService],
})
export class ResourcesModule {}
