import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";
import { EventStore as DomainEventStore } from "../../event-sourcing/store/EventStore";

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

  static toDomain(eventStore: EventStore): DomainEventStore {
    return DomainEventStore.create({
      id: eventStore.id,
      name: eventStore.name,
      entityId: eventStore.entityId,
      event: eventStore.event,
    });
  }

  fromDomain(eventStore: DomainEventStore): void {
    this.id = eventStore.id;
    this.name = eventStore.name;
    this.entityId = eventStore.entityId;
    this.event = { ...eventStore.event, name: eventStore.name };
  }
}
