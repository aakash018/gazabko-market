import express from "express";
import { Products } from "../../entities/Products";
import { Seller } from "../../entities/seller/Seller";
import validateAdmin from "../../middleware/validateAdmin";

const router = express();

router.post("/verifySeller", validateAdmin, async (req, res) => {
  const userReq = req.body as { sid: number };
  try {
    await Seller.update(
      {
        id: userReq.sid,
      },
      { isVerified: true }
    );

    res.json({
      status: "ok",
      message: "seller verified",
    });
  } catch {
    res.json({
      status: "fail",
      message: "fail to verify seller",
    });
  }
});

router.get("/getPendingSellers", validateAdmin, async (_, res) => {
  try {
    const pendingSellers = await Seller.find({
      where: { isVerified: false },
    });
    res.json({
      message: "sellers found",
      status: "ok",
      pendingSellers,
    });
  } catch {
    res.json({
      message: "failed to find sellers",
      status: "fail",
    });
  }
});

router.get("/getVerifiedSeller", validateAdmin, async (_, res) => {
  try {
    const verifiedSellers = await Seller.createQueryBuilder("seller")
      .where({ isVerified: true })
      // .leftJoinAndSelect("seller.products", "products")
      .loadRelationCountAndMap("seller.productCount", "seller.products")
      .getMany();

    res.json({
      message: "sellers found",
      status: "ok",
      verifiedSellers,
    });
  } catch {
    res.json({
      message: "failed to find sellers",
      status: "fail",
    });
  }
});

router.get("/oneSellerInfo", validateAdmin, async (req, res) => {
  const userReq = req.query as unknown as { sid: number };

  try {
    const seller = await Seller.createQueryBuilder("seller")
      .where({ id: userReq.sid })
      // .leftJoinAndSelect("seller.products", "products")
      .loadRelationCountAndMap("seller.followerCount", "seller.followers")
      .loadRelationCountAndMap("seller.productCount", "seller.products")
      .getOne();

    res.json({
      status: "ok",
      message: "seller found",
      seller,
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to find seller",
    });
  }
});

router.get("/getSellerDisplayProducts", validateAdmin, async (req, res) => {
  const userReq = req.query as unknown as { sid: number };

  try {
    const newProducts = await Products.find({
      where: { seller: { id: userReq.sid } },
      order: { created_at: "DESC" },
      select: [
        "id",
        "name",
        "discount",
        "price",
        "priceAfterDiscount",
        "rating",
        "created_at",
      ],
      take: 2,
    });

    const mostSoldProducts = await Products.find({
      select: [
        "id",
        "name",
        "discount",
        "price",
        "priceAfterDiscount",
        "rating",
        "timesBought",
      ],
      where: { seller: { id: userReq.sid } },
      order: { timesBought: "DESC" },
      take: 4,
    });

    res.json({
      status: "ok",
      message: "products found",
      newProducts,
      mostSoldProducts,
    });
  } catch (e) {
    res.json({
      status: "fail",
      message: "failed to find products",
    });
  }
});

router.get("/products", validateAdmin, async (req, res) => {
  const userReq = req.query as unknown as { sid: number };

  try {
    const products = await Products.find({
      where: { seller: { id: userReq.sid } },
      select: ["name", "timesBought", "totalStock", "id"],
      take: 10,
    });

    res.json({
      status: "ok",
      message: "products found",
      products,
    });
  } catch {
    res.json({
      status: "ok",
      message: "failed to load products",
    });
  }
});

router.get("/topSellers", validateAdmin, async (_, res) => {
  try {
    const sellers = await Seller.find({
      order: { itemsSold: "DESC" },
      select: ["id", "storeName", "itemsSold"],
      take: 10,
    });
    res.json({
      status: "ok",
      message: "sellers found",
      sellers,
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to find sellers",
    });
  }
});

router.put("/banSeller", validateAdmin, async (req, res) => {
  const userReq = req.body as { sid: number };

  try {
    await Seller.update(
      {
        id: userReq.sid,
      },
      { isBanned: true }
    );

    res.json({
      status: "ok",
      message: "seller banned",
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to ban user",
    });
  }
});

router.put("/unbanSeller", validateAdmin, async (req, res) => {
  const userReq = req.body as { sid: number };

  try {
    await Seller.update(
      {
        id: userReq.sid,
      },
      { isBanned: false }
    );

    res.json({
      status: "ok",
      message: "seller unbanned",
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to unban user",
    });
  }
});

router.get("/deactivatedSellers", validateAdmin, async (_, res) => {
  try {
    const sellers = await Seller.createQueryBuilder("seller")
      .where({ isBanned: true })
      // .leftJoinAndSelect("seller.products", "products")
      // .loadRelationCountAndMap("seller.followerCount", "seller.followers")
      .loadRelationCountAndMap("seller.productCount", "seller.products")
      .getMany();
    res.json({
      status: "ok",
      message: "sellers found",
      sellers,
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to find sellers",
    });
  }
});

export default router;
