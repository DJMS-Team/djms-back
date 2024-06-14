import { User } from "src/users/entities/user.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export abstract class Role {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text',{
        nullable:false
    })
    role_name:string;

    @OneToMany(() => User, (user) => user.role)
    users: User[];
}
