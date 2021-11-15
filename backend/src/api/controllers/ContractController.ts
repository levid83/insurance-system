import ContractService from "../services/ContractService";
import { Contract } from "../entities/Contract";

const { validationResult } = require("express-validator");

export async function getContracts(req, res) {
  try {
    const page = req.query.page || 0;
    const limit = req.query.limit || 25;

    const result = await contractService.getContracts({
      page,
      limit,
    });
    return res.status(200).json({ data: result });
  } catch (err) {
    return res.status(404).json({ error: "No contract found" });
  }
}

export async function addContract(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ error: errors.array()[0].msg });
  try {
    const { premium, startDate, contractId } = req.body.contract;
    console.log(premium, startDate, contractId);

    return res.status(201).json({ data: "contract successfully created" });
  } catch (err) {
    return res.status(404).json({ error: "Cannot create the contract" });
  }
}
