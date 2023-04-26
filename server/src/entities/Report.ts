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
export class Report extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  report: string;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.report)
  user: User;

  @Column()
  productID: number;

  @ManyToOne(() => Products, (product) => product.report)
  product: Products;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
