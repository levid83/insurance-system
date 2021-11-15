import { CommandHandler } from "../../../event-sourcing/interfaces/CommandHandler";
import ContractService from "../../../services/ContractService";
import { ContractCreatedEvent } from "../events/ContractCreatedEvent";
import { CreateContractCommand } from "./../commands/CreateContractCommand";
import { Event } from "../../../event-sourcing/interfaces/Event";

export class CreateContractHandler
  implements CommandHandler<CreateContractCommand, Event>
{
  constructor(private contractService: ContractService) {}

  async validate(command: CreateContractCommand): Promise<boolean> {
    if (command.contractId) {
      const contract = await this.contractService.getContractById(
        command.contractId
      );
      if (contract) return false;
    }
    return true;
  }

  async execute(command: CreateContractCommand): Promise<Event | false> {
    if (!(await this.validate(command))) return false;

    const event: ContractCreatedEvent = {
      contractId: command.contractId,
      premium: command.premium,
      startDate: command.startDate,
    };
    return { event, name: "ContractCreatedEvent", entityId: event.contractId };
  }
}
