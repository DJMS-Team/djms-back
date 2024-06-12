import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductType } from "./product.enum";
import { Product } from "./product.entity";

@Entity()
export class product_type {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text',{
        nullable:false
    })
    product_type:ProductType;

    @OneToMany(()=>Product, (product)=>product.product_type)
    products:Product;
}