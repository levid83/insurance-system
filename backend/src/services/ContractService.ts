import { Contract } from "../domain/contract/Contract";
import { TerminateContractDTO } from "../domain/contract/DTO";
import { ContractRepository } from "../infrastructure/repositories/ContractRepository";

export default class ContractService {
  private repo: ContractRepository;
  constructor(repository?: ContractRepository) {
    if (repository) this.repo = repository;
  }

  withRepository(repository: ContractRepository) {
    this.repo = repository;
    return this;
  }

  async save(contract: Contract): Promise<Contract> {
    try {
      return await this.repo.saveContract(contract);
    } catch (err) {
      console.log("Cannot create the contract ", contract, err);
    }
  }

  async getContractById(id: number): Promise<Contract | null> {
    const res = await this.repo.getContractById(id);
    return res;
  }

  async getContracts(filter?: {
    page?: number;
    limit?: number;
  }): Promise<{ contracts: any[]; count: number }> {
    const count = await this.repo.getContractsCount(filter);
    const contracts = await this.repo.getContracts(filter);
    return {
      contracts: contracts.map((ctr) => ctr.toJSON()) || [],
      count,
    };
  }

  async terminateContract(data: TerminateContractDTO): Promise<void> {
    await this.repo.terminateContract(data);
  }
}
