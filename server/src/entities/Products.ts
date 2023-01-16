import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { OnCartProduct } from "./Cart/OnCartProduct";
import { Order } from "./Orders";
import { Question } from "./QuestionAndAnswer";
import { Review } from "./Review";
import { Seller } from "./seller/Seller";

@Entity()
export class Products extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  rating: number;

  @Column()
  price: number;

  @Column()
  brand: string;

  @Column()
  totalStock: number;

  @Column()
  store: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column()
  images: string;

  @Column()
  tags: string;

  @Column({ default: false })
  isHidden: boolean;

  @Column({ nullable: true, default: 0 })
  discount: number;

  @Column({ nullable: true })
  priceAfterDiscount: number;

  @Column({ nullable: true })
  offers: string;

  @Column({ nullable: true })
  sizes: string;
  @Column({ nullable: true })
  color: string;

  @Column()
  category: string;

  @Column({ default: 0 })
  timesBought: number;

  @Column()
  sku: number;

  @OneToMany(() => Order, (order) => order.product)
  order: Order[];

  @OneToMany(() => Question, (question) => question.product)
  questions: Question[];

  @OneToMany(() => OnCartProduct, (onCart) => onCart.product)
  onCartProduct: OnCartProduct[];

  @ManyToOne(() => Seller, (seller) => seller.products)
  seller: Seller;

  @OneToMany(() => Review, (review) => review.review)
  review: Review[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
