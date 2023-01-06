import express from "express";
import { Products } from "../entities/Products";
import { Seller } from "../entities/Seller";

const router = express();

router.get("/getSellerInfo", async (req, res) => {
  const userPram = req.query as unknown as { sid: string };
  try {
    // const seller = await Seller.findOne({ where: { id: userPram.sid },  });

    const seller = await Seller.createQueryBuilder("seller")
      .where({ id: parseInt(userPram.sid) })
      // .leftJoinAndSelect("seller.products", "products")
      .loadRelationCountAndMap("seller.productCount", "seller.products")
      .getOne();

    console.log("Seller", seller);

    if (seller) {
      res.json({
        status: "ok",
        message: "seller found",
        seller,
      });
    } else {
      res.json({
        status: "fail",
        message: "seller not found",
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "error trying to find seller info",
    });
  }
});

router.get("/getSellerProducts", async (req, res) => {
  const userReq = req.query as unknown as { sid: string };

  try {
    const products = await Products.find({
      where: { seller: { id: parseInt(userReq.sid) } },
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
        message: "failed to find product",
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "error while finding product",
    });
  }
});

// router.post("/followSeller", async (req, res) => {
//   const userReq = req.body as unknown as { sid: string };

//   const seller = await Seller.findOne({ where: { id: parseInt(userReq.sid) } });
// });

export default router;
