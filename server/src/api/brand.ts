import express from "express";
import { Products } from "../entities/Products";

const router = express();

router.get("/mostSold", async (req, res) => {
  const userReq = req.query as { brand: string };

  try {
    const products = await Products.find({
      where: { brand: userReq.brand },
      select: {
        name: true,
        price: true,
        images: true,
        id: true,
      },
      order: { timesBought: "DESC" },
      take: 6,
    });

    res.json({
      status: "ok",
      message: "top products found",
      products,
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to find products",
    });
  }
});

router.get("/", async (req, res) => {
  const userReq = req.query as { brand: string };
  try {
    const products = await Products.find({
      where: {
        brand: userReq.brand,
      },
      relations: {
        offers: true,
      },
      select: {
        id: true,
        name: true,
        price: true,
        priceAfterDiscount: true,
        images: true,
        discount: true,
        rating: true,
        offers: {
          common_discount: true,
          ending_date: true,
          starting_date: true,
          discount: true,
        },
      },
      order: {
        name: "ASC",
      },
      take: 12,
    });

    res.json({
      status: "ok",
      message: "products found",
      products,
    });
  } catch {
    res.json({
      status: "ok",
      message: "failed to find products",
    });
  }
});

export default router;
