import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Products } from "../Products";
import { SubCategory } from "./SubCategories";

@Entity()
export class SubSubCategory extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true, unique: true })
  name: string;

  @ManyToOne(() => Products, (product) => product.subsubCategory)
  products: Products[];

  @ManyToOne(() => SubCategory, (subcategory) => subcategory.subsubCategories, {
    onDelete: "CASCADE",
  })
  subcategory: SubCategory;

  //   @OneToMany(() => )

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
