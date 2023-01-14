import express from "express";
import { Order } from "../../entities/Orders";
import validateSeller from "../../middleware/validateSeller";

const router = express();

router.get("/recentOrders", validateSeller, async (req, res) => {
  try {
    const orders = await Order.find({
      where: { product: { seller: { id: req.session.sellerID } } },
      relations: {
        product: true,
      },
      order: { created_at: "DESC" },
    });

    if (orders) {
      res.json({
        status: "ok",
        message: "orders found",
        orders,
      });
    } else {
      res.json({
        status: "fail",
        message: "error finding orders",
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "fail to find orders",
    });
  }
});

router.get("/getOrdersByStatus", validateSeller, async (req, res) => {
  const userQuery = req.query as unknown as {
    type: "pending" | "processing" | "delivered";
  };

  try {
    const orders = await Order.find({
      where: {
        product: { seller: { id: req.session.sellerID } },
        status: userQuery.type,
      },
      relations: {
        product: true,
      },
    });
    if (orders) {
      res.json({
        status: "ok",
        message: "orders found",
        orders,
      });
    } else {
      res.json({
        status: "fail",
        message: "orders not found",
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "failed to find orders",
    });
  }
});

export default router;
