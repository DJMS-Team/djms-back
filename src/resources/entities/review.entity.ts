import { Product } from "../../inventories/entities/product.entity";
import { Customer } from "../../users/entities/customer.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./comment.entity";

@Entity()
export class Review {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('double precision',{
        nullable:false
    })
    score: number;

    @ManyToOne(()=>Customer, (customer)=>customer.reviews)
    customer:Customer;

    @ManyToOne(()=>Product, (product)=>product.reviews)
    product: Product;

    @OneToOne(()=>Comment, (comment)=>comment.review)
    @JoinColumn({
        name: 'comment_id'
    })
    comment: Comment;
}
