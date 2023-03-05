import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  subscribers: [`dist/subscriber/**/*{.js,.ts}`],
  entities: [`${__dirname}/../domain/**/*{.ts,.js}`],
  migrations: [`${__dirname}/../migrations/**/*{.js,.ts}`],
});
