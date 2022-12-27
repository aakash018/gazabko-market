import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Products } from "./Products";
import { Seller } from "./Seller";
import { User } from "./User";

@Entity()
export class Answer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  answer: number;

  @Column()
  productID: number;

  @ManyToOne(() => User, (user) => user.questions)
  user: User;

  @ManyToOne(() => Seller, (seller) => seller.answers)
  seller: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  productID: number;

  @ManyToOne(() => User, (user) => user.questions)
  user: User;

  @ManyToOne(() => Products, (product) => product.questions)
  product: Products;

  @OneToOne(() => Answer, { nullable: true })
  @JoinColumn()
  answer: Answer;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
