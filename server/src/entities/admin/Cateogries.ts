import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Products } from "../Products";
import { Seller } from "../seller/Seller";
import { SubCategory } from "./SubCategories";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ default: 0 })
  commission: number;

  @OneToMany(() => Products, (product) => product.category)
  products: Products[];

  @OneToMany(() => Seller, (seller) => seller.category)
  sellers: Seller[];

  @OneToMany(() => SubCategory, (subcat) => subcat.category, {
    cascade: true,
  })
  subCatagories: SubCategory[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
