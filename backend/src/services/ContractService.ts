import { getCustomRepository, ObjectType } from "typeorm";
import { Contract } from "../domain/contract/Contract";
import { TerminateContractDTO } from "../domain/contract/DTO";
import { ContractRepository } from "../infrastructure/repositories/ContractRepository";

export default class ContractService {
  private repo: ContractRepository;
  constructor(repository?: ObjectType<ContractRepository>) {
    if (repository) this.repo = getCustomRepository(repository);
  }

  withRepository(repository: ContractRepository) {
    this.repo = repository;
    return this;
  }

  async save(contract: Contract): Promise<Contract> {
    try {
      return await this.repo.saveContract(contract);
    } catch (err) {
      console.log("Cannot create the contract ", contract);
    }
  }

  async getContractById(id: number): Promise<Contract | null> {
    const res = await this.repo.getContractById(id);
    return res;
  }

  async getContracts(filter?: {
    page?: number;
    limit?: number;
  }): Promise<{ contracts: Contract[]; count: number }> {
    const count = await this.repo.getContractsCount(filter);
    const contracts = await this.repo.getContracts(filter);
    return {
      contracts,
      count,
    };
  }

  async terminateContract(data: TerminateContractDTO): Promise<void> {
    await this.repo.terminateContract(data);
  }
}
