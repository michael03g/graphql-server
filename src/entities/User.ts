import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Facility } from "./Facility";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({
    type: "enum",
    enum: ["Doctor", "Administrator"],
    default: "Doctor",
  })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => Facility, (facility) => facility.users, {
    cascade: true,
  })
  @JoinTable()
  facilities: Facility[];
}
