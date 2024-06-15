
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "../../address/entities/address.entity";
import { Order } from "../../orders/entities/order.entity";
import { Comment } from "../../resources/entities/comment.entity";
import { Review } from "../../resources/entities/review.entity";
import { Inventory } from "../../inventories/entities/inventory.entity"
import { Role } from "./roles.enum";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text',{
        nullable:false
    })
    name:string;

    @Column('text',{
        nullable:false
    })
    password:string;

    @Column('text',{
        nullable:false
    })
    email:string;

    @Column('text',{
        array:true,
        nullable:false
    })
    roles:Role;

    @OneToMany(() => Address, (address) => address.user)
    addresses: Address[];

    @OneToMany(() => Order, (order) => order.customer, {nullable: true})
    orders?: Order[];

    @OneToMany(() => Comment, (comment) => comment.customer)
    comments: Comment[];
    
    @OneToMany(() => Review, (review) => review.customer)
    reviews: Review[];

    @OneToOne(() => Inventory, (inventory) => inventory.user, {nullable: true})
    inventory?: Inventory;

    @Column('text', {
        nullable: false
    })
    photo_url: string;

    // @BeforeInsert()
    // giveRole() {
    //     if(!this.roles){
    //         this.roles.push(Role.User)
    //     }
    // }
}
