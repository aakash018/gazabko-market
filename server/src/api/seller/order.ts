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

router.get("/getOneOrderInfo", validateSeller, async (req, res) => {
  const userReq = req.query as unknown as { oid: number };
  try {
    const order = await Order.findOne({
      where: { id: userReq.oid },
      relations: {
        product: true,
        user: true,
      },
    });
    if (order) {
      const userLastName = order.user.lastName;
      Reflect.deleteProperty(order, "user");
      res.json({
        status: "ok",
        message: "order found",
        userLastName: userLastName,
        order,
      });
    } else {
      res.json({
        status: "fail",
        message: "order info not found",
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "failed to query order",
    });
  }
});

router.put("/verifyOrder", validateSeller, async (req, res) => {
  const userReq = req.body as { oid: number };
  if (userReq.oid) {
    try {
      const order = await Order.findOne({ where: { id: userReq.oid } });
      if (order) {
        order.status = "processing";
        await order.save();

        res.json({
          status: "ok",
          message: "order verified",
        });
      } else {
        res.json({
          status: "fail",
          message: "order not found in database",
        });
      }
    } catch {
      res.json({
        status: "fail",
        message: "failed to update order",
      });
    }
  } else {
    res.json({
      status: "error",
      message: "no oid found :(",
    });
  }
});

router.delete("/cancelOrder", validateSeller, async (req, res) => {
  const userReq = req.query as unknown as { oid: number };
  if (userReq.oid) {
    try {
      await Order.delete({
        id: userReq.oid,
      });

      res.json({
        status: "ok",
        message: "order cancel",
      });
    } catch {
      res.json({
        status: "fail",
        message: "failed to cancel order",
      });
    }
  } else {
    res.json({
      status: "error",
      message: "no oid found :(",
    });
  }
});

router.get("/orderCounts", validateSeller, async (req, res) => {
  try {
    const pendingCount = await Order.countBy({
      status: "pending",
      product: { seller: { id: req.session.sellerID } },
    });
    const processingCount = await Order.count({
      where: {
        product: { seller: { id: req.session.sellerID } },
        status: "processing",
      },
    });
    const deliveredCount = await Order.countBy({
      status: "delivered",
      product: { seller: { id: req.session.sellerID } },
    });

    console.log(
      await Order.count({
        where: {
          product: { seller: { id: req.session.sellerID } },
          status: "processing",
        },
      })
    );

    res.json({
      status: "ok",
      message: "count found",
      count: {
        pendingCount,
        processingCount,
        deliveredCount,
      },
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to find counts",
    });
  }
});

export default router;
