import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../User";
import { OnCartProduct } from "./OnCartProduct";

@Entity()
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  totalAmount: number;

  @Column({ default: 0 })
  totalProducts: number;

  @OneToOne(() => User, (user) => user.cart) // specify inverse side as a second parameter
  user: User;

  @OneToMany(() => OnCartProduct, (product) => product.cart, { nullable: true })
  products: OnCartProduct[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
