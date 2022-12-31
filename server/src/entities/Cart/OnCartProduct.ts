import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Products } from "../Products";
import { Cart } from "./Cart";

@Entity()
export class OnCartProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Products)
  @JoinColumn()
  product: Products;

  @Column({ default: false })
  isGift: boolean;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  sizes: string;

  @Column({ nullable: true })
  color: string;

  @ManyToOne(() => Cart, (cart) => cart.products)
  cart: Cart;
}
