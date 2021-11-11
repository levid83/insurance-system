import { getContracts } from "../controllers/ContractController";

export default function (app: any) {
  app.get("/contracts", getContracts);
}
