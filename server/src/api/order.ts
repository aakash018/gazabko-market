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
  try {
    const user = await User.findOne({ where: { id: req.session.user } });

    if (!user) throw "No user found";

    const orders = userReq.products.map((cartProduct) => {
      const entity = Order.create({
        quantity: cartProduct.quantity,
        size: cartProduct.sizes,
        color: cartProduct.color,
        user: user as any,
        product: cartProduct.product,
        // all this crap is to find real price in case if the product belongs to offer or not
        price:
          (cartProduct.product.offers &&
          cartProduct.product.offers!.starting_date <= new Date() &&
          cartProduct.product.offers!.ending_date >= new Date() &&
          cartProduct.product.offers.common_discount
            ? cartProduct.product.price -
              cartProduct.product.price *
                (cartProduct.product.offers.discount / 100)
            : cartProduct.product.priceAfterDiscount) * cartProduct.quantity,

        offerName: cartProduct.product.offers
          ? cartProduct.product.offers.name
          : undefined,
        offerDiscount: cartProduct.product.offers
          ? cartProduct.product.offers.discount
          : undefined,
        offerHasCommonDiscount: cartProduct.product.offers
          ? cartProduct.product.offers.common_discount
          : undefined,
        isGift: cartProduct.isGift,
        deliveryAddress: userReq.address.deliveryAddress,
        nearestLandmark: userReq.address.nearestLandmark,
        latlng: userReq.address.latlng,
      });
      return entity;
    });

    await Order.insert(orders);
    res.json({
      status: "ok",
      message: "order placed",
    });
  } catch (e) {
    console.log(e);
    res.json({
      status: "fail",
      message: "failed to place order",
    });
  }
});

router.get("/orderHistory", validateUser, async (req, res) => {
  try {
    const orders = await Order.find({
      where: { user: { id: req.session.user } },
      relations: { product: true },
      select: {
        product: {
          id: true,
          name: true,
          images: true,
          priceAfterDiscount: true,
        },
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
      message: "failed to query order ",
    });
  }
});

router.get("/orderDetails", validateUser, async (req, res) => {
  const { oid } = req.query as unknown as { oid: number };

  try {
    const order = await Order.findOne({
      where: { id: oid },
      relations: {
        product: true,
        return: true,
      },
      select: {
        id: true,
        created_at: true,
        color: true,
        size: true,
        quantity: true,
        state: true,
        status: true,
        canceledBySeller: true,
        price: true,
        deliveryAddress: true,
        nearestLandmark: true,
        product: {
          id: true,
          name: true,
          images: true,
          price: true,
          discount: true,
          priceAfterDiscount: true,
        },
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
      message: "failed to find product",
    });
  }
});

// UwU

export default router;
