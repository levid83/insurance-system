import { Command } from "../../../event-sourcing/interfaces/Command";

export interface TerminateContractCommand extends Command {
  contractId: number;
  terminationDate: Date;
}
