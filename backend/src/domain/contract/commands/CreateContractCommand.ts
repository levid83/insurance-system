import { CommandInterface } from "../../../event-sourcing/interfaces/CommandInterface";

export interface CreateContractCommand extends CommandInterface {
  contractId?: number;
  premium: number;
  startDate: Date;
}
