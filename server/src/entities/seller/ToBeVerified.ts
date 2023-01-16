import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ToBeVerified extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  sellerID: number;

  @Column()
  username: string;

  @Column()
  storeName: string;

  @Column()
  storeAddress: string;

  @Column()
  contactPerson: string;

  @Column({ type: "bigint" })
  phoneNo: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: "bigint", nullable: true })
  panNo: string;
}
