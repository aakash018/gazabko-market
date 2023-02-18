import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Order } from "../Orders";
import { Products } from "../Products";

@Entity()
export class Offers extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: Date })
  starting_date: Date;

  @Column({ type: Date })
  ending_date: Date;

  @Column({ default: false })
  show_on_homepage: boolean;

  @Column({ default: false })
  common_discount: boolean;

  @Column({ nullable: true })
  discount: number;

  @OneToMany(() => Products, (product) => product.offers)
  products: Products[];

  @OneToMany(() => Order, (order) => order.offer)
  orders: Order[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
