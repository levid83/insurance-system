import { Command } from "../../../event-sourcing/interfaces/Command";

export interface CreateContractCommand extends Command {
  contractId?: number;
  premium: number;
  startDate: Date;
}
