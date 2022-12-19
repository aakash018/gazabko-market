import express from "express";
import cookieParser from "cookie-parser";
import "reflect-metadata";
import cors from "cors";
import { AppDataSource } from "./dataSource";

const app = express();
const PORT = 5000;

app.set("trust proxy", 1);
// app.enable("trust proxy")
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_END_POINT,
    credentials: true,
  })
);

//? Database INIT

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source Initilized");
    // User.delete({});
  })
  .catch((e) => {
    console.log("Error initilizing Data Source !!!", e);
  });

app.get("/", (_, res) => {
  res.json({
    status: "working",
  });
});

app.listen(PORT, () => {
  console.log("SERVER IS RUNNING at ", PORT);
});
