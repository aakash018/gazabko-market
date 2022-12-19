"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("reflect-metadata");
const cors_1 = __importDefault(require("cors"));
const dataSource_1 = require("./dataSource");
const auth_1 = __importDefault(require("./api/auth"));
const update_1 = __importDefault(require("./api/update"));
const app = (0, express_1.default)();
const PORT = 5000;
app.set("trust proxy", 1);
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
dataSource_1.AppDataSource.initialize()
    .then(() => {
    console.log("Data Source Initilized");
})
    .catch((e) => {
    console.log("Error initilizing Data Source !!!", e);
});
app.get("/", (_, res) => {
    res.json({
        status: "working",
    });
});
app.use("/auth", auth_1.default);
app.use("/update", update_1.default);
app.listen(PORT, () => {
    console.log("SERVER IS RUNNING at ", PORT);
});
//# sourceMappingURL=server.js.map