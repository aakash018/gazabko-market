import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  OneToMany,
  Column,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { WishlistProducts } from "./WishListToProduct";

@Entity()
export class Wishlist extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userID: string;
  @OneToOne(() => User, (user) => user.address)
  @JoinColumn({ name: "userID" })
  user: User;

  @OneToMany(
    () => WishlistProducts,
    (wishlistProducts) => wishlistProducts.wishlist,
    { cascade: true }
  )
  items: WishlistProducts[];
}
