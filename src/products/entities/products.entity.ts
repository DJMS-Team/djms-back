import { Review } from "../../resources/entities/review.entity";
import { OrderDetail } from "../../orders/entities/order_detail.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductCategory } from "./product-category.entity";
import { Size } from "./sizes.enum";
import { Comment } from "../../resources/entities/comment.entity";
import { Inventory } from "../../inventories/entities/inventory.entity";

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

    @Column('numeric', {
        nullable:false
    })
    price: number;

    @Column('text',{
        nullable:false
    })
    photo_url:string;

    @Column({
        type: 'enum',
        enum: Size,
        nullable: true
    })
    size?: Size;

    @OneToMany(()=>OrderDetail, (order_detail)=>order_detail.product, {nullable: true})
    order_details?: OrderDetail[];

    @OneToMany(()=>Review, (reviews)=>reviews.product, {nullable: true})
    reviews?: Review[];

    @ManyToOne(()=>ProductCategory, (product_type)=>product_type.products, {nullable: false})
    product_category: ProductCategory;

    @OneToMany(()=>Comment, (comment)=>comment.product, {nullable: true})
    comments?: Comment[];

    @OneToMany(()=>Inventory, (inventory)=> inventory.product, {nullable: false})
    inventory: Inventory;
}