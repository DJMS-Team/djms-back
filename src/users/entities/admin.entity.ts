import { Entity, OneToOne } from "typeorm";
import { User } from "./user.entity";
import { Inventory } from "../../inventories/entities/inventory.entity";

@Entity()
export class Admin extends User{

    @OneToOne(()=>Inventory, inventory=>inventory.admin)
    inventory: Inventory;
}