import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Products } from "./Products";
import { Wishlist } from "./Wishlist";

@Entity()
export class WishlistProducts extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Products, (product) => product.wishlists)
  product: Products;

  @ManyToOne(() => Wishlist, (Wishlist) => Wishlist.items)
  wishlist: Wishlist;

  @Column({ default: false })
  liked: boolean;

  @Column()
  productID: string;

  @CreateDateColumn()
  created_at: Date;
}
