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
import products from "./api/seller/product";
import question from "./api/question";
import cart from "./api/cart";
import order from "./api/order";
import sellerInfo from "./api/sellerInfo";
import search from "./api/search";
import address from "./api/address";
//?? RETURN REVIEW REPORT
import rrr from "./api/rrr";
import { Products } from "./entities/Products";

const app = express();
const PORT = 5000;

//? redis connect
const redisClient = createClient({ legacyMode: true });
const RedisStore = connectRedis(session);
redisClient.connect().catch(console.error);

app.set("trust proxy", 1);
// app.enable("trust proxy")

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

//? Express Session
if (process.env.SESSION_SECRET) {
  app.use(
    session({
      name: "qid",
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );
} else {
  console.log("No session secret");
}

app.use(cookieParser());

//? Parser MiddleWare
app.use(express.json() as RequestHandler);
app.use(express.urlencoded({ extended: false }) as RequestHandler);

//? Database INIT

AppDataSource.initialize()
  .then(() => {
    // User.delete({});
    // Review.delete({});
    // Address.delete({});
    // Question.delete({});
    // Cart.delete({});
    // OnCartProduct.delete({});
    // Seller.delete({});
    console.log("Data Source Initialized");
  })
  .catch((e) => {
    console.log("Error initializing Data Source !!!", e);
  });

app.get("/", async (_, res) => {
  console.log(
    await Products.findOne({ where: { id: 2 }, relations: { seller: true } })
  );
  res.json({
    status: "working",
  });
});

//? ROUTERS
app.use("/auth", auth);
app.use("/update", update);
app.use("/sellerAuth", sellerAuth);
app.use("/seller/products", products);
app.use("/question", question);
app.use("/cart", cart);
app.use("/order", order);
app.use("/search", search);
app.use("/address", address);

app.use("/sellerInfo", sellerInfo);
//?? RETURN REVIEW REPORT
app.use("/rrr", rrr);

app.listen(PORT, () => {
  console.log("SERVER IS RUNNING at ", PORT);
});
