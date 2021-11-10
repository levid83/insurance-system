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
