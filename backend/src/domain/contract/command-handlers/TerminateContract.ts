import { CommandHandler } from "../../../event-sourcing/interfaces/CommandHandler";
import ContractService from "../../../services/ContractService";
import { ContractTerminatedEvent } from "../events/ContractTerminatedEvent";
import { TerminateContractCommand } from "./../commands/TerminateContractCommand";
import { Event } from "../../../event-sourcing/interfaces/Event";

export class TerminateContractHandler
  implements CommandHandler<TerminateContractCommand, Event>
{
  constructor(private contractService: ContractService) {}

  async validate(command: TerminateContractCommand): Promise<boolean> {
    if (command.contractId) {
      const contract = await this.contractService.getContractById(
        command.contractId
      );
      if (!contract) return false;
      if (contract.terminationDate === null) return true;
      if (contract.startDate >= command.terminationDate) return false;
      if (command.terminationDate <= new Date()) return false;
      return true;
    }
  }

  async execute(command: TerminateContractCommand): Promise<Event | false> {
    if (!(await this.validate(command))) return false;

    const event: ContractTerminatedEvent = {
      contractId: command.contractId,
      terminationDate: command.terminationDate,
    };
    return {
      event,
      name: "ContractTerminatedEvent",
      entityId: event.contractId,
    };
  }
}
