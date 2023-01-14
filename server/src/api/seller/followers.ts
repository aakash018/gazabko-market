import express from "express";
import { Follow } from "../../entities/Follow";
import validateSeller from "../../middleware/validateSeller";

const router = express();

router.get("/recentFollowers", validateSeller, async (req, res) => {
  try {
    const followers = await Follow.find({
      select: {
        user: {
          firstName: true,
          lastName: true,
          avatar: true,
          id: true,
        },
      },
      where: {
        sellerId: req.session.sellerID,
      },
      relations: {
        user: true,
      },
    });

    if (followers) {
      res.json({
        status: "ok",
        message: "followers found",
        followers,
      });
    } else {
      res.json({
        status: "fail",
        message: "error finding followers",
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "failed to fetch followers",
    });
  }
});

router.get("/all", validateSeller, async (req, res) => {
  try {
    const followers = await Follow.find({
      where: {
        sellerId: req.session.sellerID,
      },
      relations: {
        user: true,
      },
    });

    if (followers) {
      res.json({
        status: "ok",
        message: "followers found",
        followers,
      });
    } else {
      res.json({
        status: "fail",
        message: "error finding followers",
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "failed to fetch followers",
    });
  }
});

export default router;
