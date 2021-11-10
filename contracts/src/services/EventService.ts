import { EntityManager } from "typeorm";
import { Event } from "../entities/Event";
import { EventName } from "../events";

export default class EventService {
  static async saveEvent(db: EntityManager, data: { name: string }) {
    let event: Event;
    switch (data.name) {
      case EventName.ContractCreatedEvent:
      case EventName.ContractTerminatedEvent:
        event = this.createContractEvent({ ...data });
        break;
    }
    await db.save(event);
  }

  private static createContractEvent(data: any): Event {
    const event = new Event();
    event.name = data.name;
    event.entity_id = data.contractId;
    delete data.name;
    event.payload = data;
    return event;
  }
}
