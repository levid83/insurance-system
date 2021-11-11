import { getConnection } from "typeorm";
import ContractService from "../services/ContractService";

export async function getContracts(req, res) {
  try {
    const contracts = await ContractService.getContracts(
      getConnection().manager
    );
    if (Array.isArray(contracts) && contracts.length > 0)
      return res.status(200).json({ data: contracts });
    else return res.status(404).json({ error: "No contract found" });
  } catch (err) {
    return res.status(404).json({ error: "No contract found" });
  }
}
