import { Product } from "../../products/entities/products.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./comment.entity";

@Entity()
export class Review {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('numeric',{
        nullable:false
    })
    score: number;

    @ManyToOne(()=>User, (customer)=>customer.reviews)
    customer:User;

    @ManyToOne(()=>Product, (product)=>product.reviews)
    product: Product;

    @OneToOne(()=>Comment, (comment)=>comment.review, {nullable: true})
    comment?: Comment;
}
