import { Product } from "../../products/entities/products.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Review } from "./review.entity";

@Entity()
export class Comment {
    
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text',{
        nullable:false
    })
    description:string;

    @Column('bool',{
        nullable:false
    })
    is_question: boolean;

    @ManyToOne(()=>User, (customer)=>customer.comments)
    customer: User;

    @ManyToOne(()=>Product, (product)=>product.comments)
    product:Product

    @OneToOne(()=>Review, review=>review.comment)
    @JoinColumn({
        name:'reviewId'
    })
    review: Review;
}