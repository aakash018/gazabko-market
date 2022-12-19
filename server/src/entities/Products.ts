import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Products extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  rating: number;

  @Column()
  brand: string;

  @Column()
  totalStock: number;

  @Column()
  store: string;

  @Column({ type: "text" })
  description: string;

  @Column()
  images: string;

  @Column()
  tags: string;

  @Column()
  isHidden: boolean;

  @Column()
  discount: number;

  @Column()
  offers: string;

  @Column()
  sizes: string;

  @Column()
  category: string;

  @Column()
  SKU: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
