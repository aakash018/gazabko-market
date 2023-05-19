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
import { User } from "./User";
import { Products } from "./Products";

import { Return } from "./Return";

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

  @Column({ default: false })
  canceledBySeller: boolean;

  @Column({ nullable: true })
  state: "received" | "outForDelivery";

  @Column({ default: "pending" })
  status: "pending" | "processing" | "delivered";

  @Column({ nullable: true })
  offerName: string;

  @Column({ nullable: true })
  offerDiscount: number;

  @Column({ nullable: true })
  offerHasCommonDiscount: boolean;

  @ManyToOne(() => Products, (product) => product.order)
  product: Products;

  @ManyToOne(() => User, (user) => user.order)
  user: User;

  @Column()
  price: number;

  @OneToOne(() => Return, { cascade: true })
  @JoinColumn()
  return: Return;

  @Column({ default: false })
  isToBeReturned: boolean;

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
