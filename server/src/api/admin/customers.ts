import express from "express";
import { User } from "../../entities/User";
import validateAdmin from "../../middleware/validateAdmin";

const router = express();

router.get("/getTopAndRecentCustomers", validateAdmin, async (_, res) => {
  try {
    const topCustomers = await User.find({
      order: { totalItemsBought: "DESC" },
      select: ["id", "totalItemsBought", "firstName", "lastName", "avatar"],
      take: 5,
    });
    const recentCustomers = await User.find({
      order: { created_at: "desc" },
      select: ["id", "created_at", "firstName", "lastName", "avatar"],
      take: 5,
    });

    res.json({
      status: "ok",
      message: "customers found",
      topCustomers,
      recentCustomers,
    });
  } catch {
    res.json({
      status: "ok",
      message: "failed to find customers",
    });
  }
});

router.get("/getAllCustomers", validateAdmin, async (_, res) => {
  try {
    const customers = await User.find({
      order: { firstName: "ASC" },
      select: [
        "id",
        "firstName",
        "lastName",
        "totalItemsBought",
        "created_at",
        "gender",
      ],
      take: 10,
    });

    res.json({
      status: "ok",
      message: "customers found",
      customers,
    });
  } catch {
    res.json({
      status: "ok",
      message: "failed to find customers",
    });
  }
});

router.get("/getOneCustomerInfo", validateAdmin, async (req, res) => {
  const userReq = req.query as unknown as { uid: number };

  try {
    // const user = await User.findOneOrFail({
    //   where: { id: userReq.uid },
    //   relations: {
    //     address: true,
    //   },
    // });

    const user = await User.createQueryBuilder("user")
      .where({ id: userReq.uid })
      .leftJoinAndSelect("user.address", "address")
      .loadRelationCountAndMap("user.reviewCount", "user.review")
      // .loadRelationCountAndMap("seller.productCount", "seller.products")
      .getOne();

    res.json({
      status: "ok",
      message: "customer info found",
      user,
    });
  } catch (e) {
    console.log(e);
    res.json({
      status: "fail",
      message: "failed to find user",
    });
  }
});

router.put("/unBanCustomer", validateAdmin, async (req, res) => {
  const userReq = req.body as { uid: number };

  try {
    await User.update(
      {
        id: userReq.uid,
      },
      { isBanned: false }
    );

    res.json({
      status: "ok",
      message: "user unbanned",
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to unban user",
    });
  }
});

router.put("/banCustomer", validateAdmin, async (req, res) => {
  const userReq = req.body as { uid: number };

  try {
    await User.update(
      {
        id: userReq.uid,
      },
      { isBanned: true }
    );

    res.json({
      status: "ok",
      message: "user banned",
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to ban user",
    });
  }
});
export default router;
