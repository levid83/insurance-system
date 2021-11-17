import { EventInterface } from "./EventInterface";

export interface EventStore {
  save(event: EventInterface): Promise<EventInterface>;
}
