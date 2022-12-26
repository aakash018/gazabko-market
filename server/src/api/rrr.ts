//?? RETURN REVIEW REPORT

import express from "express";
import { Products } from "../entities/Products";
import { Review } from "../entities/Review";
import { User } from "../entities/User";
import validateUser from "../middleware/validateUser";

const router = express();

router.post("/review", validateUser, async (req, res) => {
  const userReq = req.body;
  const user = await User.findOne({ where: { id: req.session.user } });
  const product = await Products.findOne({ where: { id: userReq.productID } });
  try {
    if (user && product) {
      await Review.create({
        rating: userReq.rating,
        product: product,
        review: userReq.review,
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

export default router;
