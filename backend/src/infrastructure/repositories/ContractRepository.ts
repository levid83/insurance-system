import { Repository, EntityRepository } from "typeorm";
import { Contract } from "../entity/Contract";
import { Contract as DomainContract } from "../../domain/contract/Contract";
import { ContractRepository as RepositoryInterface } from "../../domain/contract/Repository";
import { TerminateContractDTO } from "../../domain/contract/DTO";

@EntityRepository(Contract)
export class ContractRepository
  extends Repository<Contract>
  implements RepositoryInterface
{
  async saveContract(contract: DomainContract): Promise<DomainContract> {
    const res = await this.save(new Contract().fromDomain(contract));
    return Contract.toDomain(res);
  }

  async getContractById(id: number): Promise<DomainContract | null> {
    const res = await this.findOne(id);
    if (res) return Contract.toDomain(res);
    else return null;
  }

  async getContracts(filter?: {
    page?: number;
    limit?: number;
  }): Promise<DomainContract[]> {
    const query = this.createQueryBuilder();

    if (
      filter &&
      typeof filter.page != "undefined" &&
      typeof filter.limit != "undefined"
    ) {
      query.skip(filter.page * filter.limit).take(filter.limit);
    }
    query.orderBy("id", "DESC");
    const contracts: Contract[] = await query.getMany();
    return contracts.map((contract) => Contract.toDomain(contract));
  }

  async getContractsCount(filter?: any): Promise<number> {
    const query = this.createQueryBuilder().select("COUNT(id)", "count");
    const { count } = await query.getRawOne();
    return parseInt(count, 10);
  }

  async terminateContract(
    data: TerminateContractDTO
  ): Promise<DomainContract | boolean> {
    const contract = await this.getContractById(data.contractId);
    if (contract instanceof DomainContract) {
      contract.terminate(data.terminationDate);
      await this.save(new Contract().fromDomain(contract));
      return contract;
    } else return false;
  }
}
