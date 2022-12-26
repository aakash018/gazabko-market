import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
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
  rating: string;

  @Column()
  laglat: string;

  @ManyToOne(() => User, (user) => user.review)
  user: User;

  @ManyToOne(() => Products, (product) => product.review)
  product: Products;
}
