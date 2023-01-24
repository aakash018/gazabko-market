import express from "express";
import validateAdmin from "../../middleware/validateAdmin";
import { Order } from "../../entities/Orders";

const router = express();

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
