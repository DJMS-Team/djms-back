import { BeforeInsert, Column, Entity, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { Contact } from "./contact.entity";
import { Address } from "./address.entity";
import { Order } from "../../orders/entities/order.entity";
import { Review } from "../../resources/entities/review.entity";
import { Comment } from "../../resources/entities/comment.entity";
import { Role } from "./Role.enum";


@Entity()
export class Customer extends User {

    @Column('text',{
        nullable:true
    })
    photo_url: string;

    @OneToMany(()=>Contact, (contact) => contact.customer)
    contacts: Contact;

    @OneToMany(()=>Address, (address)=>address.customer)
    addresses: Address;

    @OneToMany(()=>Order, (order)=>order.customer)
    orders: Order;

    @OneToMany(()=>Review, (review)=>review.customer)
    reviews: Review;

    @OneToMany(()=>Comment, (comment)=>comment.customer)
    comments: Comment;

    @BeforeInsert()
    giveRole(){
        if(!this.rol)
            this.rol = null

        this.rol = Role.Customer
    }
}