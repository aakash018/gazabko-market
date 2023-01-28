import express from "express";
import validateAdmin from "../../middleware/validateAdmin";
import { Order } from "../../entities/Orders";
import { Seller } from "../../entities/seller/Seller";

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
      if (el.isHidden === true) return acc + 1;
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

export default router;
