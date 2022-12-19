import { DataSource } from "typeorm";
import { Address } from "./entities/Address";
import { Cart } from "./entities/Cart";
import { Products } from "./entities/Products";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  username: "sw17t",
  password: "password",
  database: "gazabko_market",
  synchronize: true,
  logging: true,
  entities: [User, Address, Cart, Products],
});
