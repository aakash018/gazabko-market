import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Seller } from "./Seller";

@Entity()
export class Products extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  brand: string;

  @Column()
  totalStock: number;

  @Column()
  store: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column()
  images: string;

  @Column()
  tags: string;

  @Column({ default: false })
  isHidden: boolean;

  @Column({ nullable: true })
  discount: number;

  @Column({ nullable: true })
  offers: string;

  @Column({ nullable: true })
  sizes: string;

  @Column()
  category: string;

  @Column()
  sku: number;

  @ManyToOne(() => Seller, (seller) => seller.products)
  seller: Seller;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
