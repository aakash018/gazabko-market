import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Products } from "./Products";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({ default: "pending" })
  status: "pending" | "processing" | "delivered";

  @OneToOne(() => Products)
  @JoinColumn()
  product: Products;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
