import { getCustomRepository, ObjectType } from "typeorm";
import { Contract } from "../domain/contract/Contract";
import { ContractRepository } from "../infrastructure/repositories/ContractRepository";

export default class ContractService {
  private repo: ContractRepository;
  constructor(repository?: ObjectType<ContractRepository>) {
    if (repository) this.repo = getCustomRepository(repository);
  }

  setRepository(repository: ContractRepository) {
    this.repo = repository;
  }

  async save(contract: Contract): Promise<Contract> {
    return await this.repo.saveContract(contract);
  }

  async getContractById(id: number): Promise<Contract | false> {
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
}
