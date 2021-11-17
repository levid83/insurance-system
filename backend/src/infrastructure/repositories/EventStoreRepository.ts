import { EntityRepository, Repository } from "typeorm";
import { EventStore } from "../entity/EventStore";
import { Event } from "../../event-sourcing/store/Event";
import { EventStoreRepository as RepositoryInterface } from "../../event-sourcing/store/Repository";

@EntityRepository(EventStore)
export class EventStoreRepository
  extends Repository<EventStore>
  implements RepositoryInterface
{
  async saveEvent(event: Event): Promise<Event> {
    const eventStoreItem = new EventStore().fromDomain(event);
    const res = await this.save(eventStoreItem);
    return EventStore.toDomain(res);
  }

  async getEventById(id: number): Promise<Event> {
    const newEvent = await this.findOne(id);
    return EventStore.toDomain(newEvent);
  }
}
