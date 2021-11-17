import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";
import { Event } from "../../event-sourcing/store/Event";

@Entity({ name: "event_store" })
export class EventStore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Index()
  @Column({ type: "bigint", nullable: true })
  entityId: number;

  @Column({ type: "jsonb" })
  event: object;

  static toDomain(eventStore: EventStore): Event {
    return Event.create({
      id: eventStore.id,
      name: eventStore.name,
      entityId: eventStore.entityId,
      event: eventStore.event,
    });
  }

  fromDomain(eventStore: Event): EventStore {
    this.id = eventStore.id;
    this.name = eventStore.name;
    this.entityId = eventStore.entityId;
    this.event = { ...eventStore.event, name: eventStore.name };
    return this;
  }
}
