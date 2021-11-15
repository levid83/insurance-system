import { EntityRepository, Repository } from "typeorm";
import { EventStore } from "../entity/EventStore";
import { EventStore as DomainEventStore } from "../../event-sourcing/store/EventStore";
import { EventStoreRepository as RepositoryInterface } from "../../event-sourcing/store/Repository";

@EntityRepository(EventStore)
export class EventStoreRepository
  extends Repository<EventStore>
  implements RepositoryInterface
{
  async saveEvent(eventStore: DomainEventStore): Promise<DomainEventStore> {
    const es = new EventStore();
    es.fromDomain(eventStore);
    const res = await this.manager.save(es);
    return EventStore.toDomain(res);
  }
}
