import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Products } from "./Products";

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  review: string;

  @Column()
  rating: number;

  @ManyToOne(() => User, (user) => user.review)
  user: User;

  @Column()
  productID: number;

  @ManyToOne(() => Products, (product) => product.review)
  product: Products;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
