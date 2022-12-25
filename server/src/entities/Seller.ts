import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Products } from "./Products";

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

  @Column()
  password: string;

  @Column()
  contactPerson: string;

  @Column()
  phoneNo: number;

  @Column({ default: "seller" })
  role: string;

  @Column({ default: true })
  isVerified: boolean;

  @Column({ nullable: true })
  panNo: number;

  @OneToMany(() => Products, (product) => product.seller)
  products: Products[];
}
