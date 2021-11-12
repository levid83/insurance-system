import { getConnection } from "typeorm";
import ContractService from "../services/ContractService";

export async function getContracts(req, res) {
  try {
    const page = req.query.page || 0;
    const limit = req.query.limit || 25;

    const result = await ContractService.getContracts(getConnection().manager, {
      page,
      limit,
    });
    return res.status(200).json({ data: result });
  } catch (err) {
    return res.status(404).json({ error: "No contract found" });
  }
}
