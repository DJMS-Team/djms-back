import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { Admin } from "../../users/entities/admin.entity";

@Entity()
export class Inventory {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('bigint', {
        nullable:false
    })
    quantity: string;

    @OneToOne(()=>Product, (product)=>product.inventory)
    @JoinColumn({
        name:'product_id'
    })
    product:Product;

    @OneToOne(()=>Admin, admin=>admin.inventory)
    @JoinColumn({
        name:'admin_id'
    })
    admin: Admin

}
