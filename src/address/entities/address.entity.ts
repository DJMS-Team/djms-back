import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { City } from "../entities/city.entity"

@Entity()
export class Address{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text',{
        nullable:false
    })
    street:string;

    @Column('text',{
        nullable:false
    })
    avenue:string

    @Column('text',{
        nullable:false
    })
    house_number:string

    @ManyToOne(()=>User, (user)=> user.addresses)
    user: User;

    @ManyToOne(() => City, (city) => city.addresses)
    city: City;
}