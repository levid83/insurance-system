import path from "path";
import { getConnection } from "typeorm";
import { connectDb, cleanupDb } from "./database";

import { createServer } from "./server";

import { processFileLineByLine } from "./utils";
import EventService from "./services/EventService";

async function importEvents() {
  const queryRunner = getConnection().createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    await processFileLineByLine(
      path.join(__dirname, "import", "test-data.txt"),
      async (line) =>
        await EventService.saveEvent(queryRunner.manager, JSON.parse(line))
    );
    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    console.log("Cannot import the event list");
  } finally {
    await queryRunner.release();
  }
}

const app = createServer();
const PORT = process.env.PORT || 3001;

connectDb()
  .then(async (connection) => {
    await cleanupDb(connection);
    await importEvents();
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  })
  .catch((error) => {
    console.log(error);
    process.emit("SIGTERM");
  });

process.on("SIGTERM", async function () {
  console.log("Process terminated");
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.log(error.stack);
  process.exit(1);
});
