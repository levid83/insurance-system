import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  getConnection,
} from "typeorm";

import { EventStore } from "../../infrastructure/entity/EventStore";
import { ContractRepository } from "../../infrastructure/repositories/ContractRepository";

import ContractService from "../ContractService";

import { EventName } from "../../domain/contract/events";
import EventStoreService from "../EventStoreService";
import { EventStoreRepository } from "../../infrastructure/repositories/EventStoreRepository";
import { Event } from "../../event-sourcing/store/Event";

import { ContractCreatedEventHandler } from "../event-handlers/ContractCreatedEventHandler";
import { ContractTerminatedEventHandler } from "../event-handlers/ContratTerminatedEventHandler";

const contractService = new ContractService();
const eventStoreService = new EventStoreService();

const getEvent = async (event: InsertEvent<EventStore>): Promise<Event> => {
  return await eventStoreService
    .withRepository(
      (!event.manager.queryRunner.isReleased
        ? event.manager
        : getConnection().manager
      ).getCustomRepository(EventStoreRepository)
    )
    .getEventById(event.entity.id);
};

const getContractService = (
  event: InsertEvent<EventStore>
): ContractService => {
  return contractService.withRepository(
    (!event.manager.queryRunner.isReleased
      ? event.manager
      : getConnection().manager
    ).getCustomRepository(ContractRepository)
  );
};

@EventSubscriber()
export class ContractEventSubscriber
  implements EntitySubscriberInterface<EventStore>
{
  listenTo() {
    return EventStore;
  }

  async afterInsert(event: InsertEvent<EventStore>) {
    const newEvent = await getEvent(event);

    if (newEvent.name === EventName.ContractCreatedEvent) {
      await new ContractCreatedEventHandler(getContractService(event)).handle(
        newEvent
      );
    }

    if (newEvent.name === EventName.ContractTerminatedEvent) {
      await new ContractTerminatedEventHandler(
        getContractService(event)
      ).handle(newEvent);
    }
  }
}
