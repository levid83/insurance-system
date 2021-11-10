import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity({ name: "event_store" })
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Index()
  @Column({ type: "bigint" })
  entity_id: number;

  @Column({ type: "jsonb" })
  payload: object;
}
