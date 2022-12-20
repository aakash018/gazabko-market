import express, { RequestHandler } from "express";
import cookieParser from "cookie-parser";
import "reflect-metadata";
import cors from "cors";
import { AppDataSource } from "./dataSource";

//? express session and redis
import connectRedis from "connect-redis";
import session from "express-session";
import { createClient } from "redis";

//? api routes and database models/entities
import auth from "./api/auth";
import update from "./api/update";
import sellerAuth from "./api/seller/auth";
// import { User } from "./entities/User";
// import { Address } from "./entities/Address";

const app = express();
const PORT = 5000;

//? redis connect
const redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);
const RedisStore = connectRedis(session);

app.set("trust proxy", 1);
// app.enable("trust proxy")
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//? Express Session
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // one day
}));

//? Parser MiddleWare
app.use(express.json() as RequestHandler);
app.use(express.urlencoded({ extended: false }) as RequestHandler);

//? Database INIT

AppDataSource.initialize()
  .then(() => {
    // User.delete({});
    // Address.delete({});
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

//? ROUTERS
app.use("/auth", auth);
app.use("/update", update);
app.use("/sellerAuth", sellerAuth);
app.listen(PORT, () => {
  console.log("SERVER IS RUNNING at ", PORT);
});
