import { Column, Entity, Long, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "../../inventories/entities/product.entity";


@Entity()
export class OrderDetail {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('bigint', {
        nullable:false
    })
    quantity:string;

    @ManyToOne(()=>Order, (order)=>order.order_details)
    order:Order;

    @ManyToOne(()=>Product, (product)=>product.order_details)
    product: Product
}