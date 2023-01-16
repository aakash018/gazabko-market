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
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  size: string;

  @Column({ default: false })
  isGift: boolean;

  @Column({ nullable: true })
  color: string;

  @Column({ default: "pending" })
  status: "pending" | "processing" | "delivered";

  @ManyToOne(() => Products, (product) => product.order)
  product: Products;

  @ManyToOne(() => User, (user) => user.order)
  user: User;

  @Column()
  deliveryAddress: string;

  @Column()
  nearestLandmark: string;

  @Column()
  latlng: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
