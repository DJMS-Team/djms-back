import { Column, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role.enum";

export abstract class User {

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
        nullable:false
    })
    rol:Role

}
