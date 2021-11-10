import dotenv from "dotenv";
import { createConnection, ConnectionOptions, Connection } from "typeorm";

dotenv.config();

const dbOptions: ConnectionOptions = {
  type: "postgres",
  url: process.env.DB_CONNECTION_URL,
  synchronize: process.env.DB_SYNCHRONIZE ? true : false,
  logging: false,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscribers",
  },
};

export const connectDb = async () => createConnection(dbOptions);

export async function cleanupDb(connection: Connection) {
  const db = connection.manager;
  await db.query(
    ` TRUNCATE event_store RESTART IDENTITY;
      TRUNCATE contracts RESTART IDENTITY;
      CREATE SEQUENCE IF NOT EXISTS event_store_entity_id_seq START 1;
      ALTER TABLE event_store ALTER COLUMN entity_id SET DEFAULT NEXTVAL('event_store_entity_id_seq');`
  );
}
