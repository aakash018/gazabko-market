import { Entity, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { Seller } from "./Seller";

@Entity()
export class Follow extends BaseEntity {
  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.followedSellers)
  user: User;

  @PrimaryColumn()
  sellerId: number;

  @ManyToOne(() => Seller, (seller) => seller.followers)
  seller: Seller;
}
