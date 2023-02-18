import express from "express";
import { AppDataSource } from "../dataSource";
import { Offers } from "../entities/admin/Offers";

const router = express();

router.get("/getOffers", async (_, res) => {
  try {
    const offers = await AppDataSource.getRepository(Offers)
      .createQueryBuilder("offer")
      .where("offer.show_on_homepage = true")
      .andWhere("offer.starting_date <= :today", { today: new Date() })
      .andWhere("offer.ending_date >= :today", { today: new Date() })
      .leftJoinAndSelect("offer.products", "products")
      .limit(5)
      .getMany();

    res.json({
      status: "ok",
      message: "offers found",
      offers,
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed tto find offers",
    });
  }
});

export default router;
