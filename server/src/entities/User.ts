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
import { Wishlist } from "./Wishlist";
import { Report } from "./Report";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToOne(() => Wishlist, (Wishlist) => Wishlist.user)
  @JoinColumn()
  wishlist: Wishlist;

  @Column({ unique: true })
  username: string;

  @Column({ default: "customer" })
  role: "customer" | "seller" | "admin";

  @Column()
  phoneNo: number;

  @Column({ select: false })
  password: string;

  @Column({ unique: true })
  email: string;

  @Column()
  gender: "male" | "female" | "others";

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true, default: false })
  emailVerified: boolean;

  @OneToMany(() => Address, (address) => address.user)
  address: Address[];

  @Column({ default: false })
  isBanned: boolean;

  @OneToOne(() => Cart, (cart) => cart.user, { nullable: true })
  @JoinColumn()
  cart: Cart;

  @OneToMany(() => Review, (review) => review.user)
  review: Review[];

  @OneToMany(() => Report, (report) => report.user)
  report: Report[];

  @OneToMany(() => Question, (question) => question.user)
  questions: Question[];

  @Column({ default: null })
  isVerified: boolean;

  @Column({ default: 0 })
  totalItemsBought: number;

  @Column({ default: 0 })
  totalMoneySpent: number;

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
