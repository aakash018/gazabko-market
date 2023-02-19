import express from "express";
import validateAdmin from "../../middleware/validateAdmin";
import { Order } from "../../entities/Orders";
import { Seller } from "../../entities/seller/Seller";
import { Products } from "../../entities/Products";
import { Review } from "../../entities/Review";

const router = express();

router.get("/getSellerCounts", validateAdmin, async (_, res) => {
  try {
    const sellers = await Seller.find({});

    const pending = sellers.reduce((acc, el) => {
      if (el.isVerified === false) return acc + 1;
      else return acc;
    }, 0);

    const verified = sellers.reduce((acc, el) => {
      if (el.isVerified === true) return acc + 1;
      else return acc;
    }, 0);

    const deactivated = sellers.reduce((acc, el) => {
      if (el.isBanned === true) return acc + 1;
      else return acc;
    }, 0);

    res.json({
      status: "ok",
      message: "count loaded",
      count: {
        pending,
        verified,
        deactivated,
      },
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to load count",
    });
  }
});

router.get("/getOrdersCount", validateAdmin, async (_, res) => {
  try {
    const orders = await Order.find({});

    const pending = orders.reduce((acc, el) => {
      if (el.status === "pending") {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);

    const processing = orders.reduce((acc, el) => {
      if (el.status === "processing") {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);

    const delivered = orders.reduce((acc, el) => {
      if (el.status === "delivered") {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);

    res.json({
      status: "ok",
      message: "order count found",
      counts: {
        pending,
        delivered,
        processing,
      },
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to load order counts",
    });
  }
});

router.get("/getProductCounts", validateAdmin, async (_, res) => {
  try {
    const products = await Products.createQueryBuilder("product")
      // .leftJoinAndSelect("seller.products", "products")
      // .loadRelationCountAndMap("product.reviewsCount", "product.review")
      //   .loadRelationCountAndMap("product.", "seller.products")
      .getMany();

    const reviewsCount = await Review.count({});

    const outOfStockCount = products.reduce((acc, el) => {
      if (el.totalStock <= 0) return acc + 1;
      else return acc;
    }, 0);

    res.json({
      status: "ok",
      message: "counts found",
      counts: {
        allProductsCount: products.length,
        reviewsCount,
        outOfStockCount,
      },
    });
  } catch {}
});

export default router;