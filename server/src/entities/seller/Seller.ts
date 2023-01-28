import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
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

  @Column({ type: "bigint" })
  phoneNo: string;

  @Column({ default: "seller" })
  role: string;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
