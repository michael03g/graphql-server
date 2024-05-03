import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Facility } from "./Facility";

@Entity()
export class Location {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  state: string;

  @Column()
  zip: string;

  @Column()
  address: string;

  @ManyToOne(() => Facility, (facility) => facility.locations)
  facility: Facility;
}
