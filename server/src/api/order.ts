import express from "express";
import { OnCartProduct } from "src/entities/Cart/OnCartProduct";
import { Order } from "../entities/Orders";

import { User } from "../entities/User";
import validateUser from "../middleware/validateUser";

const router = express();

interface AddProductsReqType {
  products: OnCartProduct[];
  address: {
    deliveryAddress: string;
    nearestLandmark: string;
    latlng: string;
  };
}

router.post("/addOrder", validateUser, async (req, res) => {
  const userReq = req.body as AddProductsReqType;
  console.log(userReq);
  const user = await User.findOne({ where: { id: req.session.user } });

  if (!user) return;

  userReq.products.forEach(async (cartProduct) => {
    try {
      await Order.create({
        quantity: cartProduct.quantity,
        size: cartProduct.sizes,
        color: cartProduct.color,
        user: user as any,
        product: cartProduct.product,
        isGift: cartProduct.isGift,
        deliveryAddress: userReq.address.deliveryAddress,
        nearestLandmark: userReq.address.nearestLandmark,
        latlng: userReq.address.latlng,
      }).save();
      res.json({
        status: "ok",
        message: "order placed",
      });
    } catch (e) {
      console.log(e);
      if (e.code === "23505") {
        res.json({
          status: "fail",
          message: "order already placed",
        });
      } else {
        res.json({
          status: "fail",
          message: "failed to order placed",
        });
      }
    }
  });
});

router.get("/orderHistory", validateUser, async (req, res) => {
  try {
    const orders = await Order.find({
      where: { user: { id: req.session.user } },
      relations: { product: true },
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
      message: "failed to query order ",
    });
  }
});

export default router;
