import { Contract } from "./Contract";
import { TerminateContractDTO } from "./DTO";

export interface ContractRepository {
  getContractById(id: number): Promise<Contract | null>;
  saveContract(contract: Contract): Promise<Contract>;
  getContracts(filter: object): Promise<Contract[]>;
  getContractsCount(filter: object): Promise<number>;
  terminateContract(data: TerminateContractDTO): Promise<Contract | boolean>;
}
