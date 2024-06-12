import { Product } from "../../inventories/entities/product.entity";
import { Customer } from "../../auth/entities/customer.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToOne(()=>Customer, (customer)=>customer.comments)
    customer: Customer;

    @ManyToOne(()=>Product, (product)=>product.comments)
    product:Product

    @OneToOne(()=>Review, review=>review.comment)
    review: Review;
}