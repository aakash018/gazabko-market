import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: "admin" })
  username: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  address: string;

  @Column({
    default: "$2a$12$Hsq9VyAjDdjVIoIGVkmFeO3oeTJAVxqMUaobKRglD63S8DuqgiFDO",
  })
  password: string;

  @Column({ nullable: true })
  contactPerson: string;

  @Column({ nullable: true, type: "bigint" })
  phoneNo: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
