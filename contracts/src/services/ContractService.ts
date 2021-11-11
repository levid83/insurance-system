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

  static async getContracts(db: EntityManager) {
    return await db.find(Contract);
  }
}
