import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Products } from "../Products";
import { Category } from "./Cateogries";
import { SubSubCategory } from "./SubSubCategory";

@Entity()
export class SubCategory extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true, unique: true })
  name: string;

  @Column({ default: 0 })
  commission: number;

  @ManyToOne(() => Category, (category) => category.subCatagories, {
    onDelete: "CASCADE",
  })
  category: Category;

  @OneToMany(() => Products, (product) => product.subCategory)
  products: Products[];

  @OneToMany(() => SubSubCategory, (subsubcat) => subsubcat.subcategory, {
    cascade: true,
  })
  subsubCategories: SubSubCategory[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
