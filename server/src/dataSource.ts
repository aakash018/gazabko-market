import { DataSource } from "typeorm";
import { Address } from "./entities/Address";
import { Admin } from "./entities/admin/Admin";
import { Category } from "./entities/admin/Cateogries";
import { Offers } from "./entities/admin/Offers";
import { SubCategory } from "./entities/admin/SubCategories";
import { SubSubCategory } from "./entities/admin/SubSubCategory";
import { Cart } from "./entities/Cart/Cart";
import { OnCartProduct } from "./entities/Cart/OnCartProduct";
import { Follow } from "./entities/Follow";
import { Order } from "./entities/Orders";
import { Products } from "./entities/Products";
import { Question } from "./entities/QuestionAndAnswer";
import { Return } from "./entities/Return";
import { Review } from "./entities/Review";
import { Seller } from "./entities/seller/Seller";
import { ToBeVerified } from "./entities/seller/ToBeVerified";
import { User } from "./entities/User";
import { VerificationCode } from "./entities/VerificationCode";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [
    User,
    Address,
    Offers,
    Cart,
    Products,
    VerificationCode,
    Admin,
    Seller,
    Review,
    Question,
    Order,
    OnCartProduct,
    Follow,
    ToBeVerified,
    Category,
    SubCategory,
    SubSubCategory,
    Return,
  ],
});
