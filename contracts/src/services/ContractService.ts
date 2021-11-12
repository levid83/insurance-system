import { EntityManager } from "typeorm";
import { Contract } from "../entities/Contract";

export default class ContractService {
  static async createContract(db: EntityManager, data: any) {
    const contract = new Contract();
    contract.id = data.contractId;
    contract.start_date = new Date(data.startDate);
    contract.premium = data.premium;
    await db.save(contract);
  }

  static async terminateContract(db: EntityManager, data: any) {
    const contract = await db.findOne(Contract, data.contractId);
    contract.termination_date = new Date(data.terminationDate);
    await db.save(contract);
  }

  static async getContractsCount(db: EntityManager, filter: any) {
    const query = db
      .getRepository(Contract)
      .createQueryBuilder("contract")
      .select("COUNT(contract.id)", "count");
    const { count } = await query.getRawOne();
    return parseInt(count, 10);
  }

  static async getContracts(db: EntityManager, filter: any) {
    const query = db.getRepository(Contract).createQueryBuilder("contract");
    if (
      typeof filter.page != "undefined" &&
      typeof filter.limit != "undefined"
    ) {
      query.skip(filter.page * filter.limit).take(filter.limit);
    }
    const count = await this.getContractsCount(db, filter);
    const contracts = await query.getMany();
    return { contracts, count };
  }
}
