import { Repository, EntityRepository } from "typeorm";
import { Contract } from "../entity/Contract";
import { Contract as DomainContract } from "../../domain/contract/Contract";
import { ContractRepository as RepositoryInterface } from "../../domain/contract/Repository";

@EntityRepository(Contract)
export class ContractRepository
  extends Repository<Contract>
  implements RepositoryInterface
{
  async saveContract(contract: DomainContract): Promise<DomainContract> {
    const ctr = new Contract();
    ctr.fromDomain(contract);
    const res = await this.manager.save(ctr);
    return Contract.toDomain(res);
  }

  async getContractById(id: number): Promise<DomainContract | false> {
    const res = await this.findOne(id);
    if (res) return Contract.toDomain(res);
    else return false;
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
    const contracts: Contract[] = await query.getMany();
    return contracts.map((contract) => Contract.toDomain(contract));
  }

  async getContractsCount(filter?: any): Promise<number> {
    const query = this.createQueryBuilder().select("COUNT(id)", "count");
    const { count } = await query.getRawOne();
    return parseInt(count, 10);
  }
}
