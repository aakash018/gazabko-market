import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

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

  @Column()
  isVerified: number;

  @Column({ nullable: true })
  panNo: number;
}
