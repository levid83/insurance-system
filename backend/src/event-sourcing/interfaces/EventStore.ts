import { Event } from "./Event";

export interface EventStore {
  save(event: Event): Promise<Event>;
}
