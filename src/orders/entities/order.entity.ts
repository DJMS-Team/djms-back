import { Customer } from "../../auth/entities/customer.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PaymentMethod } from "./payment_method";
import { OrderDetail } from "./order_detail.entity";

@Entity()
export class Order {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('int', {
        nullable:false
    })
    status:number;

    @Column('date', {
        nullable:false
    })
    date:Date;

    @ManyToOne(()=>Customer, (customer)=>customer.orders)
    customer:Customer;

    @ManyToOne(()=>PaymentMethod, (payment_method)=> payment_method.orders)
    payment_method: PaymentMethod;

    @OneToMany(()=>OrderDetail, (order_detail)=>order_detail.order)
    order_details: OrderDetail;

}
