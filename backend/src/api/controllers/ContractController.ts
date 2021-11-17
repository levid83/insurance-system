import { CreateContractHandler } from "../../services/command-handlers/CreateContract";
import { TerminateContractHandler } from "../../services/command-handlers/TerminateContract";
import { ContractRepository } from "../../infrastructure/repositories/ContractRepository";
import { EventStoreRepository } from "../../infrastructure/repositories/EventStoreRepository";
import ContractService from "../../services/ContractService";
import { EventService } from "../../services/EventService";
import EventStoreService from "../../services/EventStoreService";
import { getConnection } from "typeorm";

const { validationResult } = require("express-validator");

const contractService = new ContractService(
  getConnection().manager.getCustomRepository(ContractRepository)
);

const contractCreationService = new EventService(
  new CreateContractHandler(contractService),
  new EventStoreService(
    getConnection().manager.getCustomRepository(EventStoreRepository)
  )
);

const contractTerminationService = new EventService(
  new TerminateContractHandler(contractService),
  new EventStoreService(
    getConnection().manager.getCustomRepository(EventStoreRepository)
  )
);

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
    return res.status(404).json({ error: "No contract has been found" });
  }
}

export async function addContract(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ error: errors.array()[0].msg });
  try {
    const { premium, startDate, contractId } = req.body.contract;

    await contractCreationService.execute({ premium, startDate, contractId });

    return res
      .status(201)
      .json({ data: "contract has been successfully created" });
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}

export async function terminateContract(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ error: errors.array()[0].msg });
  try {
    const { terminationDate, contractId } = req.body;

    await contractTerminationService.execute({ terminationDate, contractId });

    return res
      .status(201)
      .json({ data: "contract termination date has been successfully set" });
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}
