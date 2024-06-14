import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "src/products/entities/products.entity";

@Entity()
export class Inventory {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('numeric', {
        nullable:false
    })
    quantity: number;

    @ManyToOne(()=>Product, (product)=>product.inventory)
    product: Product;
}
