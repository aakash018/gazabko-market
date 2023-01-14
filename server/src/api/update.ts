import express from "express";
import validateUser from "../middleware/validateUser";
import { AppDataSource } from "../dataSource";
import { User } from "../entities/User";

import nodemailer from "nodemailer";

import bcrypt from "bcrypt";
import { generateCode } from "../../utils/generateRandomCode";
import { VerificationCode } from "../entities/VerificationCode";

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

interface UpdateProfileReqType {
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
}
router.post("/profile", validateUser, async (req, res) => {
  const userReq = req.body as UpdateProfileReqType;

  try {
    const user = await User.findOne({
      where: { id: req.session.user },
      relations: {
        address: true,
        cart: true,
      },
    });

    if (user) {
      (user.username = userReq.username),
        (user.firstName = userReq.firstName),
        (user.lastName = userReq.lastName),
        (user.gender = userReq.gender as "male" | "female" | "others");

      await user.save();

      res.json({
        status: "ok",
        message: "user updated",
        user,
      });
    } else {
      res.json({
        status: "fail",
        message: "no user found",
      });
    }
  } catch (e) {
    if (e.code === "23505") {
      res.json({
        status: "fail",
        message: "username already exists",
      });
    } else {
      res.json({
        status: "fail",
        message: "failed to update user in server",
      });
    }
  }
});

router.post("/password", validateUser, async (req, res) => {
  const userReq = req.body as { oldPass: string; newPass: string };

  try {
    if (userReq.newPass.length < 8) throw "password too short";
    const hashPass = await bcrypt.hash(userReq.newPass, 12);
    const user = await AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .select("user")
      .where({ id: req.session.user })
      .addSelect("user.password")
      .getOne();

    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        userReq.oldPass,
        user?.password
      );

      if (isPasswordCorrect) {
        user.password = hashPass;

        await user.save();

        res.json({
          status: "ok",
          message: "password updated",
        });
      } else {
        res.json({
          status: "fail",
          message: "incorrect old password",
        });
      }
    } else {
      res.json({
        status: "fail",
        message: "user not found",
      });
    }
  } catch (e) {
    console.log(e);
    res.json({
      status: "fail",
      message:
        typeof e === "string" ? e : "failed to update password in server",
    });
  }
});

router.post(`/email`, validateUser, async (req, res) => {
  const userReq = req.body as { email: string };

  const verifyCode = generateCode();
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    transporter
      .verify()
      .then(() => console.log("YOYO"))
      .catch(console.error);

    transporter
      .sendMail({
        from: process.env.SMTP_PASSWORD, // sender address
        to: userReq.email, // list of receivers
        subject: "Verification Email", // Subject line
        text: `YOUR VERIFICATION CODE IS ${verifyCode}`, // plain text body
      })
      .then((_) => {
        res.json({
          status: "ok",
          message: "verification email sent",
        });
      })
      .catch((e) => {
        console.log(e);
        res.json({
          status: "fail",
          message: "error sending email",
        });
      });

    await VerificationCode.create({
      userID: req.session.user,
      code: verifyCode,
      email: userReq.email,
    }).save();
  } catch (e) {
    console.log(e);
    res.json({
      status: "fail",
      message: "failed to update email",
    });
  }
});

router.post("/verifyEmail", validateUser, async (req, res) => {
  const userReq = req.body as { code: string };

  try {
    const verifyData = await VerificationCode.findOne({
      where: { userID: req.session.user },
    });

    console.log(verifyData);

    if (verifyData && verifyData.email) {
      if (userReq.code === verifyData.code) {
        const user = await User.findOne({ where: { id: req.session.user } });
        if (user) {
          user.email = verifyData.email;

          await user.save();

          await VerificationCode.delete({
            userID: req.session.user,
          });

          res.json({
            status: "ok",
            message: "email updated",
          });
        } else {
          res.json({
            status: "fail",
            message: "user not found. try relogin",
          });
        }
      } else {
        res.json({
          status: "fail",
          message: "verification code did not match",
        });
      }
    } else {
      res.json({
        status: "fail",
        message: "verification code not found in server",
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "failed to update email",
    });
  }
});

export default router;
