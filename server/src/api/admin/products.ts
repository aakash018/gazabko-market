import express from "express";
import { Products } from "../../entities/Products";
import validateAdmin from "../../middleware/validateAdmin";

const router = express();

router.get("/oneProductDetail", validateAdmin, async (req, res) => {
  const userReq = req.query as unknown as { pid: number };

  try {
    const product = await Products.createQueryBuilder("product")
      .where({ id: userReq.pid })
      // .leftJoinAndSelect("seller.products", "products")
      .loadRelationCountAndMap("product.reviewsCount", "product.review")
      //   .loadRelationCountAndMap("product.", "seller.products")
      .getOne();

    res.json({
      status: "ok",
      message: "product info found",
      product,
    });
  } catch (e) {
    console.log(e);
    res.json({
      status: "fail",
      message: "failed to find products info",
    });
  }
});

export default router;
