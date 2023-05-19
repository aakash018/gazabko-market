import express from "express";
import { Order } from "../../entities/Orders";
import validateSeller from "../../middleware/validateSeller";
import { Return } from "../../entities/Return";

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

    const returnedOrder = orders.filter((order) => {
      return order.isToBeReturned;
    });

    const canceledOrders = orders.filter((order) => {
      return order.canceledBySeller;
    });

    orders.splice(10);
    returnedOrder.slice(10);
    if (orders) {
      res.json({
        status: "ok",
        message: "orders found",
        recentOrders: orders,
        returnedOrders: returnedOrder,
        canceledOrders,
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
        canceledBySeller: false,
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
      await Order.update(
        {
          id: userReq.oid,
        },
        {
          canceledBySeller: true,
        }
      );
      res.json({
        status: "ok",
        message: "order was canceled",
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
      canceledBySeller: false,
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

    const returnedCount = await Order.countBy({
      isToBeReturned: true,
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
        returnedCount,
      },
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to find counts",
    });
  }
});

router.get("/returnedOrders", validateSeller, async (req, res) => {
  try {
    // console.log(req.session.)
    const returns = await Order.find({
      where: { product: { seller: { id: req.session.sellerID } } },
      order: { created_at: "DESC" },
      relations: {
        return: true,
        product: true,
        user: true,
      },
      select: {
        id: true,
        created_at: true,
        user: {
          avatar: true,
          firstName: true,
          lastName: true,
        },
        product: {
          name: true,
          images: true,
        },
      },
    });

    res.json({
      status: "ok",
      message: "returns found",
      returns,
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to find returns",
    });
  }
});

router.put("/acceptReturn", validateSeller, async (req, res) => {
  const adminReq = req.body as { returnid: any };

  try {
    await Return.update(
      {
        id: adminReq.returnid,
      },
      {
        requestAccepted: true,
      }
    );

    res.json({
      status: "ok",
      message: "return request accepted",
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to accept request",
    });
  }
});

export default router;
