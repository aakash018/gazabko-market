import express, { RequestHandler } from "express";
import cookieParser from "cookie-parser";
import "reflect-metadata";
import cors from "cors";
import { AppDataSource } from "./dataSource";

import auth from "./api/auth";
import update from "./api/update";
// import { User } from "./entities/User";
// import { Address } from "./entities/Address";

const app = express();
const PORT = 5000;

app.set("trust proxy", 1);
// app.enable("trust proxy")
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//? Parser MiddleWare
app.use(express.json() as RequestHandler);
app.use(express.urlencoded({ extended: false }) as RequestHandler);

//? Database INIT

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source Initilized");
    // User.delete({});
    // Address.delete({});
  })
  .catch((e) => {
    console.log("Error initilizing Data Source !!!", e);
  });

app.get("/", (_, res) => {
  res.json({
    status: "working",
  });
});

//? ROUTERS
app.use("/auth", auth);
app.use("/update", update);

app.listen(PORT, () => {
  console.log("SERVER IS RUNNING at ", PORT);
});
