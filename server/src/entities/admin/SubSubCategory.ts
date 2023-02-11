import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { SubCategory } from "./SubCategories";

@Entity()
export class SubSubCategory extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  name: string;

  @ManyToOne(() => SubCategory, (subcategory) => subcategory.subsubCategories)
  subcategory: SubCategory;

  //   @OneToMany(() => )

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
