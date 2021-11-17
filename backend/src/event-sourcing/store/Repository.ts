import { EventInterface } from "../interfaces/EventInterface";

export interface EventStoreRepository {
  saveEvent(event: EventInterface): Promise<EventInterface>;
  getEventById(id: number): Promise<EventInterface>;
}
