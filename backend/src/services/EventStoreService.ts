import { getCustomRepository, ObjectType } from "typeorm";
import { EventStoreRepository } from "../infrastructure/repositories/EventStoreRepository";

import { EventStore } from "../event-sourcing/store/EventStore";

export default class EventStoreService {
  private repo: EventStoreRepository;
  constructor(repository?: ObjectType<EventStoreRepository>) {
    if (repository) this.repo = getCustomRepository(repository);
  }

  setRepository(repository: EventStoreRepository) {
    this.repo = repository;
  }

  async save(eventStore: EventStore): Promise<EventStore> {
    return await this.repo.saveEvent(eventStore);
  }

  async getEventById(id: number) {
    return await this.repo.findOne(id);
  }
}
