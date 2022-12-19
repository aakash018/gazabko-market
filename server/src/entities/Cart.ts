import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalBeforeDiscount: number;

  @Column()
  discountAmount: number;

  @Column()
  totalAfterDiscount: number;

  @Column()
  totalProducts: number;

  @OneToOne(() => User, (user) => user.cart) // specify inverse side as a second parameter
  user: User;
}
