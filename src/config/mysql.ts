import { DataSource } from "typeorm";
import { env } from "./env";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: env.mysqlHost,
  port: env.mysqlPort,
  username: env.mysqlUser,
  password: env.mysqlPass,
  database: env.mysqlDatabase,
  synchronize: true,
  logging: false,
  entities: [],
});

export async function initMysql() {
  await AppDataSource.initialize();
  const isConnected = AppDataSource.isInitialized;
  if (!isConnected) process.exit();
}