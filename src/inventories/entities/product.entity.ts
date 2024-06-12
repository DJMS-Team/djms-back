import { Review } from "../../resources/entities/review.entity";
import { OrderDetail } from "../../orders/entities/order_detail.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { product_type } from "./ProductType.entity";
import { Comment } from "../../resources/entities/comment.entity";
import { Inventory } from "./inventory.entity";

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text',{
        nullable:false
    })
    product_name:string;

    @Column('text',{
        nullable:true
    })
    description:string;

    @Column('bigint', {
        nullable:false
    })
    price: string;

    @Column('text',{
        nullable:false
    })
    photo_url:string;

    @OneToMany(()=>OrderDetail, (order_detail)=>order_detail.product)
    order_details: OrderDetail;

    @OneToMany(()=>Review, (reviews)=>reviews.product)
    reviews: Review;

    @ManyToOne(()=>product_type, (product_type)=>product_type.products)
    product_type: product_type;

    @OneToMany(()=>Comment, (comment)=>comment.product)
    comments: Comment;

    @OneToOne(()=>Inventory, (Inventory)=>Inventory.product)
    
    inventory: Inventory;

}