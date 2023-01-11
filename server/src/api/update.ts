import express from "express";
import { AppDataSource } from "../dataSource";
import { User } from "../entities/User";

const router = express();

router.post("/avatar", async (req, res) => {
  if (req.body.imgURL) {
    try {
      await AppDataSource.createQueryBuilder()
        .update(User)
        .set({ avatar: req.body.imgURL })
        .where("id = :id", { id: req.body.id })
        .execute();

      res.json({
        status: "ok",
        message: "updated",
      });
    } catch (e) {
      console.log(e);
      res.json({
        status: "fail",
        message: "failed trying to set avatar",
      });
    }
  } else {
    res.json({
      status: "fail",
      message: "no avatar choosed",
    });
  }
});

export default router;
