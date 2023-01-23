import {
  Entity,
  BaseEntity,
  ManyToOne,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Seller } from "./seller/Seller";

@Entity()
export class Follow extends BaseEntity {
  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.followedSellers)
  user: User;

  @Column({ default: 0 })
  totalItemsBought: number;

  @Column({ default: 0 })
  totalMoneySpent: number;

  @PrimaryColumn()
  sellerId: number;

  @ManyToOne(() => Seller, (seller) => seller.followers)
  seller: Seller;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
