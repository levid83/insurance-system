import ContractService from "../ContractService";

import { TerminateContractDTO } from "../../domain/contract/DTO";
import { Event } from "../../event-sourcing/store/Event";
export class ContractTerminatedEventHandler {
  constructor(private contractService: ContractService) {}
  async handle(event: Event) {
    await this.contractService.terminateContract(
      event.event as TerminateContractDTO
    );
  }
}
