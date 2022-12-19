"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Address_1 = require("./entities/Address");
const Cart_1 = require("./entities/Cart");
const Products_1 = require("./entities/Products");
const User_1 = require("./entities/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "127.0.0.1",
    username: "sw17t",
    password: "password",
    database: "gazabko_market",
    synchronize: true,
    logging: true,
    entities: [User_1.User, Address_1.Address, Cart_1.Cart, Products_1.Products],
});
//# sourceMappingURL=dataSource.js.map