import express from "express";
import { Return } from "../../entities/Return";
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
        product: {
          offers: true,
        },
        offer: true,
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

router.post("/verifyReceivedOrder", validateAdmin, async (req, res) => {
  try {
    const userReq = (await req.body) as { oid: number };

    await Order.update(
      {
        id: userReq.oid,
      },
      { status: "processing", state: "received" }
    );

    res.json({
      status: "ok",
      message: "order status updated",
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed o update order",
    });
  }
});

router.post("/verifyOutForDelivery", validateAdmin, async (req, res) => {
  try {
    const userReq = (await req.body) as { oid: number };

    await Order.update(
      {
        id: userReq.oid,
      },
      { status: "processing", state: "outForDelivery" }
    );

    res.json({
      status: "ok",
      message: "order status updated",
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed o update order",
    });
  }
});

router.post("/verifyDelivered", validateAdmin, async (req, res) => {
  try {
    const userReq = (await req.body) as { oid: number };

    const order = await Order.findOne({
      where: { id: userReq.oid },
      relations: {
        product: true,
        user: true,
      },
    });

    if (order?.product) {
      order.product.timesBought = order.product.timesBought + 1;
      order.product.totalStock = order.product.totalStock - 1;
      order.user.totalItemsBought = order.user.totalItemsBought + 1;
      order.user.totalMoneySpent = order.user.totalMoneySpent + order.price;
      order.status = "delivered";
      order.product.save();
      order.save();
    }

    res.json({
      status: "ok",
      message: "order status updated",
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed o update order",
    });
  }
});

router.get("/returnedOrders", validateAdmin, async (_, res) => {
  try {
    const returns = await Order.find({
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

router.put("/acceptReturn", validateAdmin, async (req, res) => {
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
