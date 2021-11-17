import {
  getContracts,
  addContract,
  terminateContract,
} from "../controllers/ContractController";
import { body } from "express-validator";

export const initializeRoutes = (app: any) => {
  app.get("/contracts", getContracts);
  app.post(
    "/contract",
    [
      body("contract.premium", "Premium must be a number")
        .isNumeric()
        .not()
        .isEmpty(),
      body("contract.startDate", "Start Date must be a date")
        .isDate({ format: "YYYY-MM-DD" })
        .not()
        .isEmpty(),
    ],
    addContract
  );
  app.patch(
    "/contract",
    [
      body("contractId", "Contract Id must be a number")
        .isNumeric()
        .not()
        .isEmpty(),
      body("terminationDate", "Termination Date must be a date")
        .isDate({ format: "YYYY-MM-DD" })
        .not()
        .isEmpty(),
    ],
    terminateContract
  );
};
