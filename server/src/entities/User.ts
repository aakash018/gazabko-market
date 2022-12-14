import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { Address } from "./Address";
import { Cart } from "./Cart/Cart";
import { Follow } from "./Follow";
import { Order } from "./Orders";
import { Question } from "./QuestionAndAnswer";
import { Review } from "./Review";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column({ default: "customer" })
  role: "customer" | "seller" | "admin";

  @Column()
  phoneNo: number;

  @Column({ select: false })
  password: string;

  @Column()
  email: string;

  @Column()
  gender: "male" | "female" | "others";

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true, default: false })
  emailVerified: boolean;

  @OneToMany(() => Address, (address) => address.user)
  address: Address[];

  @OneToOne(() => Cart, (cart) => cart.user, { nullable: true })
  @JoinColumn()
  cart: Cart;

  @OneToMany(() => Review, (review) => review.user)
  review: Review[];

  @OneToMany(() => Question, (question) => question.user)
  questions: Question[];

  @OneToMany(() => Order, (order) => order.user)
  order: Order[];

  @OneToMany(() => Follow, (follow) => follow.user, {
    nullable: true,
    cascade: true,
  })
  followedSellers: Follow[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
