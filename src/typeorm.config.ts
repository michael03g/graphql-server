import { DataSource } from "typeorm";
import "reflect-metadata";
import dotenv from "dotenv";

dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["src/entities/**/*.ts"],
  logging: false,
  synchronize: true, // ONLY in DEV mode
});

export default AppDataSource;
