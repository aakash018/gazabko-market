import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
} from "typeorm";
import { Products } from "../Products";
import { Seller } from "../seller/Seller";

@Entity()
export class ProductCommission extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  productID: number;

  @Column()
  sellerID: number;

  @Column()
  commission: number;

  @OneToOne(() => Products, (product) => product.commission)
  @JoinColumn()
  product: Products;

  @ManyToMany(() => Seller, (seller) => seller.productCommission)
  @JoinColumn()
  seller: Seller;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
