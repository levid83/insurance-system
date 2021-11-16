import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from "typeorm";

import { EventStore } from "../entity/EventStore";
import { ContractRepository } from "../repositories/ContractRepository";

import ContractService from "../../services/ContractService";
import { Contract as DomainContract } from "../../domain/contract/Contract";
import { ContractDTO, TerminateContractDTO } from "../../domain/contract/DTO";
import { EventName } from "../../domain/contract/events";

const contractService = new ContractService();

@EventSubscriber()
export class ContractEventSubscriber
  implements EntitySubscriberInterface<EventStore>
{
  listenTo() {
    return EventStore;
  }

  async afterInsert(event: InsertEvent<EventStore>) {
    const { entity } = event;
    if (entity.name === EventName.ContractCreatedEvent) {
      await contractService
        .withRepository(
          event.queryRunner.manager.getCustomRepository(ContractRepository)
        )
        .save(DomainContract.create(entity.event as ContractDTO));
    }
    if (event.entity.name === EventName.ContractTerminatedEvent) {
      await contractService
        .withRepository(
          event.queryRunner.manager.getCustomRepository(ContractRepository)
        )
        .terminateContract(entity.event as TerminateContractDTO);
    }
  }
}
