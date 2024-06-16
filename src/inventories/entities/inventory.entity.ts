import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../products/entities/products.entity"
import { User } from "../../users/entities/user.entity";

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

    @OneToOne(() => User, (user) => user.inventory)
    user: User;
}
