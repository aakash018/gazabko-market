"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "127.0.0.1",
    username: "sw17t",
    password: "password",
    database: "gazabko_market",
    synchronize: true,
    logging: true,
    entities: [User_1.User],
});
//# sourceMappingURL=dataSource.js.map