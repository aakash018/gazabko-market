import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deliveryAddress: string;

  @Column()
  nearestLandmark: string;

  @Column({ unique: true })
  laglat: string;
}
