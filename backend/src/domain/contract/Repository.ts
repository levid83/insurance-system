import { Contract } from "./Contract";

export interface ContractRepository {
  saveContract(contract: Contract): Promise<Contract>;
  getContracts(filter: object): Promise<Contract[]>;
  getContractsCount(filter: object): Promise<number>;
}
