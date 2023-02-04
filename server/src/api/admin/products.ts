import express from "express";
import { ProductPayloadType } from "src/types/global";
import { LessThanOrEqual } from "typeorm";
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

router.get("/topProducts", validateAdmin, async (_, res) => {
  try {
    const topProducts = await Products.find({
      select: ["id", "name", "store", "timesBought", "totalStock"],
      order: { timesBought: "DESC" },
      take: 10,
    });

    res.json({
      status: "ok",
      message: "products found",
      topProducts,
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to find top products",
    });
  }
});

router.get("/productsOutOfStock", validateAdmin, async (_, res) => {
  try {
    const outOfStockProducts = await Products.find({
      select: ["id", "name", "store", "timesBought", "totalStock"],
      where: { totalStock: LessThanOrEqual(0) },
      order: { name: "ASC" },
      take: 10,
    });

    res.json({
      status: "ok",
      message: "products found",
      outOfStockProducts,
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to find out of stock products",
    });
  }
});

router.post("/addProduct", validateAdmin, async (req, res) => {
  const adminReq = req.body as ProductPayloadType;

  try {
    await Products.create({
      name: adminReq.productName,
      brand: adminReq.brand,
      price: adminReq.price,
      totalStock: adminReq.totalStock,
      description: adminReq.description,
      images: adminReq.images,
      tags: adminReq.tags,
      discount: adminReq.discount,
      sizes: adminReq.sizes,
      store: "admin",
      color: adminReq.color,
      category: adminReq.category,
      sku: adminReq.sku,
      isByAdmin: true,
    }).save();

    res.json({
      status: "ok",
      message: "product added",
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to add product",
    });
  }
});

export default router;
