import express from "express";
import { OnCartProduct } from "../entities/Cart/OnCartProduct";
import { Cart } from "../entities/Cart/Cart";
import validateUser from "../middleware/validateUser";

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

  if (cart) {
    const cartProduct = await OnCartProduct.create({
      productID: userReq.productID,
      productName: userReq.productName,
      price: userReq.price,
      quantity: userReq.quantity,
      sizes: userReq.sizes,
      color: userReq.color,
      cart: cart,
    }).save();

    console.log(cartProduct);

    const newCart = await Cart.findOne({
      where: { user: { id: req.session.user } },
      relations: {
        products: true,
      },
    });

    console.log(newCart);

    res.send("DONE");
  }
});

export default router;
