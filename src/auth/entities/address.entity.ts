import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./customer.entity";

@Entity()
export class Address{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text',{
        nullable:true
    })
    street:string;

    @Column('text',{
        nullable:true
    })
    avenue:string

    @Column('text',{
        nullable:false
    })
    house_number:string

    @ManyToOne(()=>Customer, (customer)=> customer.addresses)
    customer: Customer;

}