import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class VerificationCode extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userID: number;

  @Column({ nullable: true })
  email: string;

  @Column()
  code: string;
}
