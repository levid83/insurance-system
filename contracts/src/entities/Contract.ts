import { Entity, Column, PrimaryColumn, Index } from "typeorm";

@Entity({ name: "contracts" })
export class Contract {
  @Index()
  @PrimaryColumn()
  id: number;

  @Column()
  premium: number;

  @Column({ type: "date" })
  start_date: Date;

  @Column({ type: "date", nullable: true })
  termination_date: Date;
}
