import { BeforeInsert, Entity, OneToOne } from "typeorm";
import { User } from "./user.entity";
import { Inventory } from "../../inventories/entities/inventory.entity";
import { Role } from "./Role.enum";

@Entity()
export class Admin extends User{

    @OneToOne(()=>Inventory, inventory=>inventory.admin)
    inventory: Inventory;

    @BeforeInsert()
    giveRole(){
        if(!this.rol)
            this.rol = null

        this.rol = Role.Admin
    }
}