import ContractService from "../ContractService";
import { Contract as DomainContract } from "../../domain/contract/Contract";
import { CreateContractDTO } from "../../domain/contract/DTO";
import { Event } from "../../event-sourcing/store/Event";
export class ContractCreatedEventHandler {
  constructor(private contractService: ContractService) {}
  async handle(event: Event) {
    await this.contractService.save(
      DomainContract.create({
        ...event.event,
        id: event.entityId,
      } as CreateContractDTO)
    );
  }
}
