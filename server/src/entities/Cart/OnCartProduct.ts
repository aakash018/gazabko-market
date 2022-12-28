import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Cart } from "./Cart";

@Entity()
export class OnCartProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productID: number;

  @Column()
  productName: string;

  @Column()
  price: number;

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
