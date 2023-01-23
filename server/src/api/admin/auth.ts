import express from "express";
import { Admin } from "../../entities/admin/Admin";
import bcrypt from "bcrypt";
const router = express();

router.post("/login", async (req, res) => {
  const adminReq = req.body as { username: string; password: string };

  try {
    const admin = await Admin.findOneOrFail({
      where: { username: adminReq.username },
    });

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

export default router;
