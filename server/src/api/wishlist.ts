import express from "express";
import { Products } from "../entities/Products";
import { Wishlist } from "../entities/Wishlist";
import { WishlistProducts } from "../entities/WishListToProduct";
import validateUser from "../middleware/validateUser";

const router = express();

router.get("/", (_, res) => {
  res.json({
    ok: "ok",
  });
});

router.post("/add", validateUser, async (req, res) => {
  const userReq = req.body as { pid: any };

  try {
    const product = await Products.findOne({ where: { id: userReq.pid } });
    const wishlist = await Wishlist.findOne({
      where: { user: { id: req.session.user } },
      relations: {
        items: true,
      },
    });

    if (wishlist?.items.some((item) => item.productID == userReq.pid)) {
      return res.json({
        status: "fail",
        message: "product already added to wishlist",
      });
    }

    if (product && wishlist) {
      WishlistProducts.create({
        productID: userReq.pid,
        product: product,
        wishlist: wishlist,
      }).save();

      return res.json({
        status: "ok",
        message: "product added to wishlist",
      });
    } else {
      return res.json({
        status: "fail",
        message: "failed to find product",
      });
    }
  } catch (e) {
    return res.json({
      status: "fail",
      message: "failed to add product to wishlist",
    });
  }
});

router.get("/getWishlist", validateUser, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      where: { userID: req.session.user as any },
      relations: {
        items: {
          product: {
            offers: true,
          },
        },
      },
      select: {
        id: true,
        items: {
          id: true,
          product: {
            id: true,
            images: true,
            name: true,
            price: true,
            priceAfterDiscount: true,
            discount: true,
            offers: {
              common_discount: true,
              discount: true,
              ending_date: true,
              starting_date: true,
            },
          },
        },
      },
    });

    console.log(wishlist);

    res.json({
      status: "ok",
      message: "wishlist found",
      wishlist,
    });
  } catch (e) {
    console.log(e);
    res.json({
      status: "fail",
      message: "failed to find wishlist",
    });
  }
});

router.delete("/deleteItem", validateUser, async (req, res) => {
  const userReq = req.query as { itemID: string };

  try {
    await WishlistProducts.delete({
      id: userReq.itemID,
    });

    res.json({
      status: "ok",
      message: "product removed from wishlist",
    });
  } catch (e) {
    console.log(e);
    res.json({
      status: "fail",
      message: "failed to remove product",
    });
  }
});

export default router;
