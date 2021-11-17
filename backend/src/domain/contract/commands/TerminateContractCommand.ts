import { CommandInterface } from "../../../event-sourcing/interfaces/CommandInterface";

export interface TerminateContractCommand extends CommandInterface {
  contractId: number;
  terminationDate: Date;
}
