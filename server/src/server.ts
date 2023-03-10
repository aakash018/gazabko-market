import express, { RequestHandler } from "express";
import cookieParser from "cookie-parser";
import "reflect-metadata";
import cors from "cors";
import { AppDataSource } from "./dataSource";
import nodemailer from "nodemailer";

//? express session and redis
import connectRedis from "connect-redis";
import session from "express-session";
import { createClient } from "redis";

//? api routes and database models/entities
import auth from "./api/auth";
import update from "./api/update";
import offers from "./api/offers";
import sellerAuth from "./api/seller/auth";
import products from "./api/seller/product";
import question from "./api/question";
import cart from "./api/cart";
import order from "./api/order";
import sellerInfo from "./api/sellerInfo";
import search from "./api/search";
import category from "./api/category";
import address from "./api/address";
import sellerOrder from "./api/seller/order";
import sellerFollowers from "./api/seller/followers";
import sellerUpdate from "./api/seller/update";
import sellerCommission from "./api/seller/comission";

import adminAuth from "./api/admin/auth";
import orders from "./api/admin/orders";
import adminCounts from "./api/admin/getCounts";
import adminSeller from "./api/admin/seller";
import adminProducts from "./api/admin/products";
import adminCustomers from "./api/admin/customers";
import adminAccount from "./api/admin/account";
import adminOffers from "./api/admin/edit/offers";
import analytics from "./api/seller/analytics";
import adminCategory from "./api/admin/edit/category";
//?? RETURN REVIEW REPORT
import rrr from "./api/rrr";
import { Products } from "./entities/Products";
import { Admin } from "./entities/admin/Admin";

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

//? Email sender
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

transporter
  .verify()
  .then(() => console.log("TRANSPORTER VERIFIED"))
  .catch(console.error);

//? Database INIT

AppDataSource.initialize()
  .then(async () => {
    const admin = await Admin.find({});

    if (admin.length !== 0) {
      console.log("ADMIN");
      app.listen(PORT, () => {
        console.log("SERVER IS RUNNING at ", PORT);
      });
    } else {
      await Admin.create({}).save();
      app.listen(PORT, () => {
        console.log("SERVER IS RUNNING at ", PORT);
      });
    }
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
app.use("/offers", offers);
app.use("/category", category);

app.use("/sellerInfo", sellerInfo);
app.use("/sellerOrder", sellerOrder);
app.use("/seller/followers", sellerFollowers);
app.use("/seller/update", sellerUpdate);
app.use("/seller/commission", sellerCommission);
app.use("/seller/analytics", analytics);

app.use("/admin/auth", adminAuth);
app.use("/admin/getCounts", adminCounts);
app.use("/admin/orders", orders);
app.use("/admin/seller", adminSeller);
app.use("/admin/products", adminProducts);
app.use("/admin/customers", adminCustomers);
app.use("/admin/customers", adminCustomers);
app.use("/admin/account", adminAccount);
app.use("/admin/offers", adminOffers);
app.use("/admin/category", adminCategory);
//?? RETURN REVIEW REPORT
app.use("/rrr", rrr);

// app.listen(PORT, () => {
//   console.log("SERVER IS RUNNING at ", PORT);
// });
