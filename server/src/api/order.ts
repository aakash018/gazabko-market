import express from "express";
import { OnCartProduct } from "src/entities/Cart/OnCartProduct";
import { Order } from "../entities/Orders";

import { User } from "../entities/User";
import validateUser from "../middleware/validateUser";

const router = express();

interface AddProductsReqType {
  products: OnCartProduct[];
}

router.post("/addOrder", validateUser, async (req, res) => {
  const userReq = req.body as AddProductsReqType;

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
      }).save();
    } catch (e) {
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

  res.json({
    status: "ok",
    message: "order placed",
  });
});

export default router;
