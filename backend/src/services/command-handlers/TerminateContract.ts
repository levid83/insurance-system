import { CommandHandler } from "../../event-sourcing/interfaces/CommandHandler";
import ContractService from "../ContractService";
import { ContractTerminatedEvent } from "../../domain/contract/events/ContractTerminatedEvent";
import { TerminateContractCommand } from "../../domain/contract/commands/TerminateContractCommand";
import { Event } from "../../event-sourcing/interfaces/Event";

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
      contract.terminate(command.terminationDate);
    }
  }

  async execute(command: TerminateContractCommand): Promise<Event | false> {
    await this.validate(command);

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
