import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from "typeorm";
import { Event } from "../entities/Event";
import { EventName } from "../events";
import ContractService from "../services/ContractService";

@EventSubscriber()
export class ContractEventSubscriber
  implements EntitySubscriberInterface<Event>
{
  listenTo() {
    return Event;
  }

  async afterInsert(event: InsertEvent<Event>) {
    if (event.entity.name === EventName.ContractCreatedEvent) {
      await ContractService.createContract(
        event.queryRunner.manager,
        event.entity.payload
      );
    }
    if (event.entity.name === EventName.ContractTerminatedEvent) {
      await ContractService.terminateContract(
        event.queryRunner.manager,
        event.entity.payload
      );
    }
  }
}
