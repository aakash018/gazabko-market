import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.address, { onDelete: "CASCADE" })
  user: User;

  @Column({ type: "bigint", nullable: true })
  phoneNo: string;

  @Column()
  deliveryAddress: string;

  @Column()
  nearestLandmark: string;

  @Column()
  latlng: string;
}
