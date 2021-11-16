import { getCustomRepository, ObjectType } from "typeorm";
import { EventStoreRepository } from "../infrastructure/repositories/EventStoreRepository";

import { EventStore } from "../event-sourcing/store/EventStore";

export default class EventStoreService {
  private repo: EventStoreRepository;
  constructor(repository?: ObjectType<EventStoreRepository>) {
    if (repository) this.repo = getCustomRepository(repository);
  }

  withRepository(repository: EventStoreRepository) {
    this.repo = repository;
    return this;
  }

  async save(eventStore: EventStore): Promise<EventStore> {
    try {
      return await this.repo.saveEvent(eventStore);
    } catch (err) {
      console.log("Cannot save the event store item ");
    }
  }

  async getEventById(id: number) {
    return await this.repo.findOne(id);
  }
}
