import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Products } from "./Products";
import { User } from "./User";

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

  @Column({ default: false })
  answered: boolean;

  @Column({ nullable: true })
  answer: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
