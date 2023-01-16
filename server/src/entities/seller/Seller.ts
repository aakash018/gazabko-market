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
import { Answer } from "../QuestionAndAnswer";

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

  @Column({ select: false })
  password: string;

  @Column()
  contactPerson: string;

  @Column({ type: "bigint" })
  phoneNo: string;

  @Column({ default: "seller" })
  role: string;

  @Column({ default: true })
  isVerified: boolean;

  @Column({ nullable: true })
  panNo: number;

  @OneToMany(() => Products, (product) => product.seller)
  products: Products[];

  @OneToMany(() => Answer, (answer) => answer.seller)
  answers: Answer[];

  @OneToMany(() => Follow, (follow) => follow.seller, {
    nullable: true,
  })
  followers: Follow[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
