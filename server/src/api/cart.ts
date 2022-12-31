import express from "express";
import { OnCartProduct } from "../entities/Cart/OnCartProduct";
import { Cart } from "../entities/Cart/Cart";
import validateUser from "../middleware/validateUser";
import { Products } from "../entities/Products";

const router = express();

interface AddToCartReqType {
  productID: number;
  productName: string;
  price: number;
  quantity: number;
  sizes?: string;
  color?: string;
}

router.post("/addToCart", validateUser, async (req, res) => {
  const userReq = req.body as AddToCartReqType;

  const cart = await Cart.findOne({
    where: { user: { id: req.session.user } },
  });

  const product = await Products.findOne({ where: { id: userReq.productID } });

  try {
    if (cart && product) {
      await OnCartProduct.create({
        product: product,
        quantity: userReq.quantity,
        sizes: userReq.sizes,
        color: userReq.color,
        cart: cart,
      }).save();

      res.json({
        status: "ok",
        message: "added to cart",
      });
    }
  } catch (e) {
    if (e.code === "23505") {
      res.json({
        status: "fail",
        message: "product already added to cart",
      });
    } else {
      res.json({
        status: "fail",
        message: "failed to add to cart",
      });
    }
  }
});

router.get("/getCart", validateUser, async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { user: { id: req.session.user } },
      relations: {
        products: {
          product: true,
        },
      },
    });

    console.log(cart);

    res.json({
      status: "ok",
      message: "cart retrieved",
      cart,
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to retrieve cart",
    });
  }
});

router.post("/deleteProduct", validateUser, async (req, res) => {
  const userReq = req.body;

  try {
    await OnCartProduct.delete({ product: { id: userReq.productID } });

    res.json({
      status: "ok",
      message: "item deleted",
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to delete item",
    });
  }
});

export default router;
