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
      take: 5,
    });

    const followersToSend = followers.map((follower) => ({
      firstName: follower.user.firstName,
      lastName: follower.user.lastName,
      avatar: follower.user.avatar,
      id: follower.user.id,
    }));

    if (followers) {
      res.json({
        status: "ok",
        message: "followers found",
        followers: followersToSend,
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

router.get("/getFollowerInfo", validateSeller, async (req, res) => {
  const userReq = req.query as unknown as { userId: number };
  try {
    const follower = await Follow.findOne({
      where: { sellerId: req.session.sellerID, userId: userReq.userId },
      relations: {
        user: true,
      },
    });
    console.log(follower);
    if (follower) {
      res.json({
        status: "ok",
        message: "follower found",
        follower: {
          avatar: follower.user.avatar,
          lastName: follower.user.lastName,
          status: follower.user.isVerified,
          itemsBoughtFromStore: follower.totalItemsBought,
          totalMoneySpentAtStore: follower.totalMoneySpent,
          joinedDate: follower.user.created_at,
        },
      });
    } else {
      res.json({
        status: "fail",
        message: "follower info not found",
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "failed to find follower info",
    });
  }
});

router.delete("/forceUnfollowUser", validateSeller, async (req, res) => {
  const userQuery = req.query as unknown as { uid: number };

  try {
    await Follow.delete({
      sellerId: req.session.sellerID,
      userId: userQuery.uid,
    });
    res.json({
      status: "ok",
      message: "user forced to unfollow you",
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to execute function",
    });
  }
});

export default router;
