//?? RETURN REVIEW REPORT

import express from "express";
import { Order } from "../entities/Orders";
import { Return } from "../entities/Return";
import { Products } from "../entities/Products";
import { Review } from "../entities/Review";
import { User } from "../entities/User";
import validateUser from "../middleware/validateUser";
import { Report } from "../entities/Report";

const router = express();

router.post("/review", validateUser, async (req, res) => {
  const userReq: { pid: any; review: string; rating: number } = req.body;
  const user = await User.findOne({ where: { id: req.session.user } });
  const product = await Products.findOne({
    where: { id: parseInt(userReq.pid) },
  });
  try {
    if (user && product) {
      const isAlreadyReviewed = await Review.findOne({
        where: { productID: userReq.pid, user: { id: req.session.user } },
      });

      if (isAlreadyReviewed) {
        return res.json({
          status: "fail",
          message: "you have already reviewed this product",
        });
      }

      await Review.create({
        rating: userReq.rating,
        product: product,
        review: userReq.review,
        productID: userReq.pid,
        user: user,
      }).save();

      const avgRating = await Review.createQueryBuilder("review")
        .leftJoin("review.product", "product")
        .where("product.id = :id ", { id: product.id })
        .select("avg(review.rating)", "avgRating")
        .getRawOne();
      console.log("AVG", avgRating);

      await Products.update(
        {
          id: parseInt(userReq.pid),
        },
        {
          rating: avgRating.avgRating,
        }
      );

      return res.json({
        status: "ok",
        message: "product reviewed successfully ",
      });
    } else {
      return res.json({
        status: "failed",
        message: "failed to find product to add review",
      });
    }
  } catch {
    return res.json({
      status: "fail",
      message: "failed to review the product!!",
    });
  }
});

router.get("/getReview", async (req, res) => {
  const userReq = req.query as unknown as { pid: string; page: number };

  const pageSize = 2;
  const skip = (userReq.page - 1) * pageSize;

  try {
    const reviews = await Review.find({
      where: { productID: parseInt(userReq.pid) },
      relations: {
        user: true,
      },
      select: {
        id: true,
        review: true,
        rating: true,
        created_at: true,
        user: {
          firstName: true,
          lastName: true,
        },
      },
      order: {
        rating: "DESC",
      },
      take: pageSize,
      skip,
    });

    console.log("REV", reviews);

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

router.post("/returnProduct", validateUser, async (req, res) => {
  const userReq = req.body as { oid: any; message: string };
  console.log(userReq);
  try {
    const returnEntity = Return.create({
      message: userReq.message,
    });

    const order = await Order.findOne({
      where: { id: userReq.oid },
    });

    if (order) {
      order.isToBeReturned = true;
      order.return = returnEntity;

      order.save();
      res.json({
        status: "ok",
        message: "return request set",
      });
    } else {
      res.json({
        status: "fail",
        message: "can't find requested order",
      });
    }

    // await Order.update(
    //   {
    //     id: userReq.oid,
    //   },
    //   {
    //     isToBeReturned: true,
    //     return: returnEntity,
    //   }
    // );
  } catch (e) {
    console.log(e);
    res.json({
      status: "fail",
      message: "failed to send return request",
    });
  }
});

router.post("/addReport", validateUser, async (req, res) => {
  const userData = req.body as { title: string; report: string; pid: any };
  console.log(userData);
  try {
    const user = await User.findOne({ where: { id: req.session.user } });
    const product = await Products.findOne({
      where: { id: userData.pid },
    });

    if (user && product) {
      await Report.create({
        user,
        product,
        productID: product.id,
        report: userData.report,
        title: userData.title,
      }).save();
      res.json({
        status: "ok",
        message: "report added",
      });
    }
  } catch (e) {
    console.log(e);
    res.json({
      status: "fail",
      message: "failed to add report",
    });
  }
});

export default router;
