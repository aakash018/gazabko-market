import express from "express";
import { Products } from "../entities/Products";

const router = express();

router.get("/getSpecificProduct", async (req, res) => {
  const userReq = req.query as unknown as {
    category: string;
    subCategory: string;
    subsubCategory: string;
  };

  try {
    const products = await Products.find({
      where: {
        category: { name: userReq.category },
        subCategory: { name: userReq.subCategory },
        subsubCategory: { name: userReq.subsubCategory },
      },
      order: {
        timesBought: "DESC",
      },
      take: 16,
    });

    res.json({
      status: "ok",
      message: "products found",
      products,
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to find products",
    });
  }
});

export default router;
