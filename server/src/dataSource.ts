import { DataSource } from "typeorm";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  username: "sw17t",
  password: "password",
  database: "gazabko_market",
  synchronize: true,
  logging: true,
  entities: [User],
});
