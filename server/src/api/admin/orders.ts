import express from "express";
import { Order } from "../../entities/Orders";
import validateAdmin from "../../middleware/validateAdmin";

const router = express();

router.get("/getRecentOrders", validateAdmin, async (_, res) => {
  try {
    const recentOrders = await Order.find({
      order: {
        created_at: "DESC",
      },
      relations: {
        product: true,
        user: true,
      },
      take: 10,
    });

    res.json({
      status: "ok",
      message: "orders found",
      recentOrders,
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to find orders",
    });
  }
});

router.get("/getPendingOrders", validateAdmin, async (_, res) => {
  try {
    const pendingOrders = await Order.find({
      where: { status: "pending" },
      order: {
        created_at: "DESC",
      },
      relations: {
        product: true,
      },
      take: 10,
    });

    res.json({
      status: "ok",
      message: "orders found",
      pendingOrders,
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to find orders",
    });
  }
});

router.get("/getDeliveredOrders", validateAdmin, async (_, res) => {
  try {
    const deliveredOrders = await Order.find({
      where: { status: "delivered" },
      order: {
        created_at: "DESC",
      },
      relations: {
        product: true,
      },
      take: 10,
    });

    res.json({
      status: "ok",
      message: "orders found",
      deliveredOrders,
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to find orders",
    });
  }
});

router.get("/getProcessingOrders", validateAdmin, async (_, res) => {
  try {
    const processingOrders = await Order.find({
      where: { status: "processing" },
      order: {
        created_at: "DESC",
      },
      relations: {
        product: true,
      },
      take: 10,
    });

    res.json({
      status: "ok",
      message: "orders found",
      processingOrders,
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to find orders",
    });
  }
});

router.get("/getOneOrderInfo", validateAdmin, async (req, res) => {
  const adminReq = req.query as unknown as { oid: number };

  try {
    const order = await Order.findOneOrFail({
      where: { id: adminReq.oid },
      relations: {
        product: true,
        user: true,
      },
    });
    res.json({
      status: "ok",
      message: "order found",
      order,
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to retrieve order",
    });
  }
});

export default router;
