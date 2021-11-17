import { CommandHandler } from "../../event-sourcing/interfaces/CommandHandlerInterface";
import ContractService from "../ContractService";
import { ContractCreatedEvent } from "../../domain/contract/events/ContractCreatedEvent";
import { CreateContractCommand } from "../../domain/contract/commands/CreateContractCommand";
import { EventInterface } from "../../event-sourcing/interfaces/EventInterface";
import { Contract } from "../../domain/contract/Contract";

export class CreateContractHandler
  implements CommandHandler<CreateContractCommand, EventInterface>
{
  constructor(private contractService: ContractService) {}

  async validate(command: CreateContractCommand): Promise<boolean> {
    if (command.contractId) {
      const contract = await this.contractService.getContractById(
        command.contractId
      );
      if (contract) return false;
    }

    Contract.validateCreation(command);

    return true;
  }

  async execute(
    command: CreateContractCommand
  ): Promise<EventInterface | false> {
    if (!(await this.validate(command))) return false;

    const event: ContractCreatedEvent = {
      contractId: command.contractId,
      premium: command.premium,
      startDate: command.startDate,
    };
    return { event, name: "ContractCreatedEvent", entityId: event.contractId };
  }
}
