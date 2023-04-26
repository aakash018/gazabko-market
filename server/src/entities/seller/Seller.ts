import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Category } from "../admin/Cateogries";
import { ProductCommission } from "../admin/SellerProductCommission";
import { Follow } from "../Follow";
import { Products } from "../Products";

@Entity()
export class Seller extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  storeName: string;

  @Column()
  address: string;

  @Column({ default: false })
  isHidden: boolean;

  @Column({ select: false })
  password: string;

  @Column()
  contactPerson: string;

  @Column()
  phoneNo: string;

  @Column({ default: "seller" })
  role: string;

  @Column({ default: 0 })
  rating: number;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  panNo: string;

  @Column({ default: 0 })
  itemsSold: number;

  @OneToMany(() => Products, (product) => product.seller)
  products: Products[];

  @OneToMany(() => Follow, (follow) => follow.seller, {
    nullable: true,
  })
  followers: Follow[];

  @ManyToOne(() => Category, (category) => category.sellers)
  category: Category;

  @OneToOne(() => ProductCommission, (commission) => commission.seller)
  productCommission: ProductCommission;

  @Column({ default: false })
  isBanned: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
