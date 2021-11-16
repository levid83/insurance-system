import path from "path";
import { getConnection } from "typeorm";
import { EventStore } from "./event-sourcing/store/EventStore";
import { connectDb, cleanupDb, adjustDb } from "./infrastructure/database";
import { EventStoreRepository } from "./infrastructure/repositories/EventStoreRepository";

import { createServer } from "./server";
import EventStoreService from "./services/EventStoreService";

import { processFileLineByLine } from "./utils";

async function importEvents() {
  console.log("start event import process");

  const queryRunner = getConnection().createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  const eventStoreService = new EventStoreService(EventStoreRepository);

  try {
    await processFileLineByLine(
      path.join(__dirname, "import", "test-data.txt"),
      async (line) => {
        const rawEvent = JSON.parse(line);
        await eventStoreService.save(
          EventStore.create({
            entityId: rawEvent.contractId,
            name: rawEvent.name,
            event: rawEvent,
          })
        );
      }
    );
    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    console.log("Cannot import the event list", err);
  } finally {
    await queryRunner.release();
    console.log("end event import process");
  }
}

connectDb()
  .then(async (connection) => {
    await cleanupDb(connection);
    await importEvents();
    await adjustDb(connection);

    const app = createServer();
    const PORT = process.env.PORT || 3001;

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
