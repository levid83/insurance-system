import { connectDb } from "./database";

connectDb()
  .then(async (connection) => {})
  .catch((error) => console.log(error));
