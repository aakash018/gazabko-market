import express from "express";
import { Admin } from "../../entities/admin/Admin";
import validateAdmin from "../../middleware/validateAdmin";

import bcrypt from "bcrypt";

const router = express();

router.post("/update", validateAdmin, async (req, res) => {
  try {
    await Admin.update(
      {
        id: req.session.adminID,
      },
      {
        name: req.body.name,
        address: req.body.address,
        username: req.body.username,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
      }
    );

    res.send({
      status: "ok",
      message: "admin updated",
    });
  } catch {
    res.send({
      status: "fail",
      message: "failed to update admin on server",
    });
  }
});

router.post("/passwordUpdate", validateAdmin, async (req, res) => {
  try {
    const admin = await Admin.findOne({
      select: ["password", "id"],
      where: { id: req.session.adminID },
    });

    if (await bcrypt.compare(req.body.oldPass, admin!.password)) {
      const hashPass = await bcrypt.hash(req.body.newPass, 12);

      admin!.password = hashPass;

      await admin?.save();

      res.json({
        status: "ok",
        message: "password updated",
      });
    } else {
      res.json({
        status: "fail",
        message: "old password did not match",
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "failed to update password in server",
    });
  }
});

export default router;
