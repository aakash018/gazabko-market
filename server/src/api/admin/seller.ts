import express from "express";
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
    const seller = await Seller.findOneOrFail({
      where: { id: userReq.sid },
    });

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

export default router;
