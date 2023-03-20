import express from "express";
import { AppDataSource } from "../dataSource";
import { Products } from "../entities/Products";

import { escapeLikeString } from "../../utils/escapeLikeString";
import { Between, In, Like } from "typeorm";

const router = express();

router.get("/", async (req, res) => {
  const userReq = req.query as unknown as { keyword: string; category: string };

  if (!userReq.keyword) {
    res.json({
      status: "fail",
      message: "noting to search",
    });
  } else {
    try {
      if (userReq.category === "All Categories") {
        const products = await AppDataSource.getRepository(Products)
          .createQueryBuilder("products")
          .where("Lower(products.name) LIKE LOWER(:name)", {
            name: `%${escapeLikeString(userReq.keyword)}%`,
          })
          .limit(16)
          .getMany();

        res.json({
          status: "ok",
          message: "products queried",
          products,
        });
      } else {
        const products = await AppDataSource.getRepository(Products)
          .createQueryBuilder("product")
          .leftJoin("product.category", "category")
          .leftJoin("product.offers", "offers")
          .where("LOWER(product.name) LIKE LOWER(:name)", {
            name: `%${escapeLikeString(userReq.keyword)}%`,
          })
          .andWhere("category.name LIKE :category", {
            category: userReq.category,
          })
          .select([
            "product.id",
            "product.name",
            "product.price",
            "product.priceAfterDiscount",
            "product.discount",
            "product.timesBought",
            "offers.common_discount",
            "offers.discount",
            "offers.ending_date",
            "offers.starting_date",
          ])
          .limit(16)
          .getMany();

        res.json({
          status: "ok",
          message: "products queried",
          products,
        });
      }
    } catch (e) {
      console.log(e);
      res.json({
        status: "fail",
        message: "failed to return data",
      });
    }
  }
});

router.get("/getSortFilter", async (req, res) => {
  const userReq = req.query as {
    filter: "All Products" | "Price High To Low" | "Price Low To High";
    keyword: string;
  };

  try {
    let products = undefined;
    if (userReq.filter === "All Products") {
      products = await AppDataSource.getRepository(Products)
        .createQueryBuilder("products")
        .where("LOWER(products.name) LIKE LOWER(:name)", {
          name: `%${escapeLikeString(userReq.keyword)}%`,
        })
        .limit(16)
        .getMany();
    } else if (userReq.filter === "Price High To Low") {
      products = await AppDataSource.getRepository(Products)
        .createQueryBuilder("products")
        .where("LOWER(products.name) LIKE LOWER(:name)", {
          name: `%${escapeLikeString(userReq.keyword)}%`,
        })
        .orderBy("products.priceAfterDiscount", "DESC")
        .limit(16)
        .getMany();
    } else if (userReq.filter === "Price Low To High") {
      products = await AppDataSource.getRepository(Products)
        .createQueryBuilder("products")
        .where("LOWER(products.name) LIKE LOWER(:name)", {
          name: `%${escapeLikeString(userReq.keyword)}%`,
        })
        .orderBy("products.priceAfterDiscount", "ASC")
        .limit(16)
        .getMany();
    }
    if (products) {
      res.json({
        status: "ok",
        message: "products found",
        products,
      });
    } else {
      res.json({
        status: "fail",
        message: "products not found",
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "failed to sort products in server :(",
    });
  }
});

interface filteredUserReqType {
  filters: {
    brands: string[];
    price: {
      low: string;
      high: string;
    };
  };
  keyword: string;
}

router.get("/getFilteredProducts", async (req, res) => {
  const userReq = req.query as unknown as filteredUserReqType;
  try {
    const products = await Products.find({
      where: {
        name: Like(`${escapeLikeString(userReq.keyword)}`),
        brand: In(userReq.filters.brands),
        priceAfterDiscount: Between(
          parseInt(userReq.filters.price.low),
          parseInt(userReq.filters.price.high)
        ),
      },
    });

    if (products) {
      res.json({
        status: "ok",
        message: "products found",
        products,
      });
    } else {
      res.json({
        status: "fail",
        message: "products",
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "failed to filter products",
    });
  }
});

router.get("/getPriceFilter", async (req, res) => {
  const userReq = req.query as { price: { low: string; high: string } };
  try {
    const products = await Products.find({
      where: {
        priceAfterDiscount: Between(
          parseInt(userReq.price.low),
          parseInt(userReq.price.high)
        ),
      },
    });
    if (products) {
      res.json({
        status: "ok",
        message: "got products",
        products,
      });
    } else {
      res.json({
        status: "fail",
        message: "no product found",
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "failed to filter products",
    });
  }
});

export default router;
