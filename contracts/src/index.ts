import { connectDb, cleanupDb } from "./database";

connectDb()
  .then(async (connection) => {
    await cleanupDb(connection);
  })
  .catch((error) => console.log(error));
