import { CommandHandler } from "../../event-sourcing/interfaces/CommandHandlerInterface";
import ContractService from "../ContractService";
import { ContractTerminatedEvent } from "../../domain/contract/events/ContractTerminatedEvent";
import { TerminateContractCommand } from "../../domain/contract/commands/TerminateContractCommand";
import { EventInterface } from "../../event-sourcing/interfaces/EventInterface";

export class TerminateContractHandler
  implements CommandHandler<TerminateContractCommand, EventInterface>
{
  constructor(private contractService: ContractService) {}

  async validate(command: TerminateContractCommand): Promise<boolean> {
    if (command.contractId) {
      const contract = await this.contractService.getContractById(
        command.contractId
      );
      if (!contract) return false;
      contract.validateTermination(command.terminationDate);
      contract.terminate(command.terminationDate);
    }
  }

  async execute(
    command: TerminateContractCommand
  ): Promise<EventInterface | false> {
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
