import path from "path";
import { getConnection } from "typeorm";
import { connectDb, cleanupDb } from "./database";
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

connectDb()
  .then(async (connection) => {
    await cleanupDb(connection);
    await importEvents();
  })
  .catch((error) => console.log(error));
