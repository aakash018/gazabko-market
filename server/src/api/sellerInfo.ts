import express from "express";
import validateUser from "../middleware/validateUser";
import { Products } from "../entities/Products";
import { Seller } from "../entities/seller/Seller";

import { Follow } from "../entities/Follow";
import { User } from "../entities/User";

const router = express();

router.get("/getSellerInfo", async (req, res) => {
  const userPram = req.query as unknown as { sid: string };
  try {
    // const seller = await Seller.findOne({ where: { id: userPram.sid },  });

    const seller = await Seller.createQueryBuilder("seller")
      .where({ id: parseInt(userPram.sid) })
      // .leftJoinAndSelect("seller.products", "products")
      .loadRelationCountAndMap("seller.productCount", "seller.products")
      .getOne();

    console.log("Seller", seller);

    if (seller) {
      res.json({
        status: "ok",
        message: "seller found",
        seller,
      });
    } else {
      res.json({
        status: "fail",
        message: "seller not found",
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "error trying to find seller info",
    });
  }
});

router.get("/getSellerProducts", async (req, res) => {
  const userReq = req.query as unknown as { sid: string };

  try {
    const products = await Products.find({
      where: { seller: { id: parseInt(userReq.sid) } },
    });

    if (products) {
      res.json({
        status: "ok",
        message: "products found",
        products,
      });
    } else {
      res.json({
        status: "fail",
        message: "failed to find product",
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "error while finding product",
    });
  }
});

router.post("/followSeller", validateUser, async (req, res) => {
  const userReq = req.body as unknown as { sid: string };

  try {
    const seller = await Seller.findOne({
      where: { id: parseInt(userReq.sid) },
    });
    const user = await User.findOne({
      where: { id: req.session.user },
      relations: { followedSellers: true },
    });

    //? If already followed
    if (
      user?.followedSellers.some(
        (follow) => follow.sellerId === parseInt(userReq.sid)
      )
    ) {
      return res.json({
        status: "fail",
        message: "already followed",
      });
    }

    if (user && seller) {
      await Follow.create({
        userId: user?.id,
        sellerId: seller?.id,
        user,
        seller,
      }).save();

      return res.json({
        status: "ok",
        message: "seller followed",
      });
    } else {
      return res.json({
        status: "fail",
        message: "user or seller not found",
      });
    }
  } catch {
    return res.json({
      status: "fail",
      message: "error trying to follow seller",
    });
  }
});

router.post("/unfollowSeller", validateUser, async (req, res) => {
  const userReq = req.body as { sid: string };

  try {
    await Follow.delete({
      userId: req.session.user,
      sellerId: parseInt(userReq.sid),
    });
    res.json({
      status: "ok",
      message: "unfollowed store",
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to unfollow user",
    });
  }
});

router.get("/isFollowed", validateUser, async (req, res) => {
  const userReq = req.query as unknown as { sid: string };
  try {
    const user = await User.findOne({
      where: { id: req.session.user },
      relations: { followedSellers: true },
    });

    const isFollowed = user?.followedSellers.some(
      (follow) => follow.sellerId === parseInt(userReq.sid)
    );

    console.log("ISS", userReq);

    if (isFollowed) {
      res.json({
        status: "ok",
        message: "got seller info",
        isFollowed: true,
      });
    } else {
      res.json({
        status: "ok",
        message: "got seller followed info",
        isFollowed: false,
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "failed to get seller followed info",
    });
  }
});

router.get("/getFollowingList", validateUser, async (req, res) => {
  try {
    const userWithFollowers = await User.findOne({
      where: { id: req.session.user },
      relations: {
        followedSellers: {
          seller: true,
        },
      },
    });
    console.log("Follow", userWithFollowers?.followedSellers);
    if (userWithFollowers?.followedSellers) {
      res.json({
        status: "ok",
        message: "seller Info Found",
        sellers: userWithFollowers?.followedSellers,
      });
    } else {
      res.json({
        status: "fail",
        message: "user or followers not found",
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "fail to find followers",
    });
  }
});

export default router;
