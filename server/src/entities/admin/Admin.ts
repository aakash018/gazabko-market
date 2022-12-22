import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "admin" })
  username: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  address: string;

  @Column({
    default: "$2a$12$Hsq9VyAjDdjVIoIGVkmFeO3oeTJAVxqMUaobKRglD63S8DuqgiFDO",
  })
  password: string;

  @Column()
  contactPerson: string;

  @Column()
  phoneNo: number;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  panNo: number;
}
