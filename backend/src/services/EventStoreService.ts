import { EventStoreRepository } from "../infrastructure/repositories/EventStoreRepository";

import { Event } from "../event-sourcing/store/Event";

export default class EventStoreService {
  private repo: EventStoreRepository;
  constructor(repository?: EventStoreRepository) {
    if (repository) this.repo = repository;
  }

  withRepository(repository: EventStoreRepository) {
    this.repo = repository;
    return this;
  }

  async save(event: Event): Promise<Event> {
    try {
      return await this.repo.saveEvent(event);
    } catch (err) {
      console.log("Cannot save the event store item ", event, err);
    }
  }

  async getEventById(id: number) {
    return await this.repo.getEventById(id);
  }
}
