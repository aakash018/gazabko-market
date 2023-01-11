//?? RETURN REVIEW REPORT

import express from "express";
import { Products } from "../entities/Products";
import { Review } from "../entities/Review";
import { User } from "../entities/User";
import validateUser from "../middleware/validateUser";

const router = express();

router.post("/review", validateUser, async (req, res) => {
  const userReq: { pid: string; review: string; rating: string } = req.body;
  const user = await User.findOne({ where: { id: req.session.user } });
  const product = await Products.findOne({
    where: { id: parseInt(userReq.pid) },
  });
  try {
    if (user && product) {
      await Review.create({
        rating: parseInt(userReq.rating),
        product: product,
        review: userReq.review,
        productID: parseInt(userReq.pid),
        user: user,
      }).save();

      res.json({
        status: "ok",
        message: "product reviewed successfully ",
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "failed to review the product!!",
    });
  }
});

router.get("/getReview", async (req, res) => {
  const userReq = req.query as unknown as { pid: string };
  console.log(userReq);
  try {
    const reviews = await Review.find({
      where: { productID: parseInt(userReq.pid) },
      relations: {
        user: true,
      },
    });
    if (reviews && reviews.length !== 0) {
      res.json({
        status: "ok",
        message: "reviews retrieved",
        reviews: reviews,
      });
    } else {
      res.json({
        status: "fail",
        message: "no reviews found",
      });
    }
  } catch {
    res.json({
      status: "ok",
      message: "failed to retrieve review",
    });
  }
});

router.get("/getAllReviews", validateUser, async (req, res) => {
  try {
    const reviews = await Review.find({
      where: { user: { id: req.session.user } },
      relations: {
        product: true,
      },
    });
    console.log("RRR", reviews);
    if (reviews) {
      res.json({
        status: "ok",
        message: "reviews found",
        reviews,
      });
    } else {
      res.json({
        status: "fail",
        message: "error finding reviews",
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "can't query reviews",
    });
  }
});

export default router;
