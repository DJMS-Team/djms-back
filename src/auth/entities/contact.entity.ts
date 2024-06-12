import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./customer.entity";

@Entity()
export class Contact {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text',{
        nullable:false,
        unique:true
    })
    email:string;

    @Column('text',{
        nullable:false,
        unique:true
    })
    phone_number:string;

    @ManyToOne(()=>Customer, (customer)=> customer.contacts)
    customer:Customer;

}