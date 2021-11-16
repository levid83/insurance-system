import dotenv from "dotenv";
import { createConnection, ConnectionOptions, Connection } from "typeorm";

dotenv.config();

const dbOptions: ConnectionOptions = {
  type: "postgres",
  url: process.env.DB_CONNECTION_URL,
  synchronize: true,
  logging: false,
  entities: ["src/infrastructure/entity/**/*.ts"],
  migrations: ["src/infrastructure/migration/**/*.ts"],
  subscribers: ["src/infrastructure/subscribers/**/*.ts"],
  cli: {
    entitiesDir: "src/infrastructure/entity",
    migrationsDir: "src/infrastructure/migration",
    subscribersDir: "src/infrastructure/subscribers",
  },
};

export const connectDb = async () => createConnection(dbOptions);

export async function cleanupDb(connection: Connection) {
  const db = connection.manager;
  await db.query(
    ` TRUNCATE event_store RESTART IDENTITY;
      TRUNCATE contracts RESTART IDENTITY;
      CREATE SEQUENCE IF NOT EXISTS event_store_entity_id_seq START 1;
      CREATE SEQUENCE IF NOT EXISTS contracts_id_seq START 1;
      ALTER TABLE event_store ALTER COLUMN "entityId" SET DEFAULT NEXTVAL('event_store_entity_id_seq');
      ALTER TABLE contracts ALTER COLUMN id SET DEFAULT NEXTVAL('contracts_id_seq');`
  );
}

export async function adjustDb(connection: Connection) {
  const db = connection.manager;
  const [max] = await db.query('SELECT MAX("entityId") FROM event_store');

  await db.query(
    `ALTER SEQUENCE event_store_entity_id_seq RESTART WITH ${
      parseInt(max.max, 10) + 1
    }`
  );
}
