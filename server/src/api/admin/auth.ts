import express from "express";
import { Admin } from "../../entities/admin/Admin";
import bcrypt from "bcrypt";
import validateAdmin from "../../middleware/validateAdmin";
import { AppDataSource } from "../../dataSource";
const router = express();

router.post("/login", async (req, res) => {
  const adminReq = req.body as { username: string; password: string };

  try {
    const admin = await AppDataSource.getRepository(Admin)
      .createQueryBuilder("admin")
      .select("admin")
      .where({ username: adminReq.username })
      .addSelect("admin.password")
      .getOne();

    if (admin) {
      const isPasswordCorrect = await bcrypt.compare(
        adminReq.password,
        admin.password
      );

      if (isPasswordCorrect) {
        req.session.adminID = admin.id;
        res.json({
          status: "ok",
          message: "login successful",
          user: admin,
        });
      } else {
        res.json({
          status: "fail",
          message: "password incorrect",
        });
      }
    } else {
      res.json({
        status: "fail",
        message: "no user found",
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "failed to login admin",
    });
  }
});

router.get("/me", validateAdmin, async (req, res) => {
  try {
    const admin = await Admin.findOne({
      where: { id: req.session.adminID },
    });
    res.json({
      status: "ok",
      message: "admin info found",
      admin,
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to find user info",
    });
  }
});

export default router;
