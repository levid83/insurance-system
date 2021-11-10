import path from "path";
import { connectDb, cleanupDb } from "./database";
import { processFileLineByLine } from "./utils";

async function importEvents() {
  try {
    await processFileLineByLine(
      path.join(__dirname, "import", "test-data.txt"),
      async (line) => console.log(line)
    );
  } catch (err) {
    console.log("Cannot import the event list");
  }
}

connectDb()
  .then(async (connection) => {
    await cleanupDb(connection);
    await importEvents();
  })
  .catch((error) => console.log(error));
