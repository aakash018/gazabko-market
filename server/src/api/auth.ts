import express from "express";
import { AppDataSource } from "..//dataSource";
import { Address } from "../entities/Address";
import { User } from "../entities/User";

import { generateCode } from "../../utils/generateRandomCode";
import { VerificationCode } from "../entities/VerificationCode";
import bcrypt from "bcrypt";
import validateUser from "../middleware/validateUser";
import { Cart } from "../entities/Cart/Cart";
import { transporter } from "../server";

const router = express();

interface SignUpPayloadType {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  delivaryAdd: string;
  nearestLandmark: string;
  mapCods: string;
  gender: "male" | "female" | "others";
  phone: number;
}

router.post("/signup", async (req, res) => {
  const userData: SignUpPayloadType = req.body;
  try {
    const hashPass = await bcrypt.hash(userData.password, 12);
    const user = new User();

    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
    user.gender = userData.gender;
    user.password = hashPass;
    user.username = userData.username;
    user.email = userData.email;
    user.phoneNo = userData.phone;

    await AppDataSource.manager.save(user);

    const address = new Address();
    address.deliveryAddress = userData.delivaryAdd;
    address.latlng = userData.mapCods;
    address.nearestLandmark = userData.nearestLandmark;
    address.user = user;

    await AppDataSource.manager.save(address);

    await Cart.create({
      user: user,
    }).save();

    const verifyCode = generateCode();

    await VerificationCode.create({
      userID: user.id,
      code: verifyCode,
    }).save();

    transporter
      .sendMail({
        from: process.env.SMTP_PASSWORD, // sender address
        to: userData.email, // list of receivers
        subject: "Verification Email", // Subject line
        text: `YOUR VERIFICATION CODE IS ${verifyCode}`, // plain text body
      })
      .then((info) => {
        console.log({ info });
      })
      .catch(console.error);

    res.json({
      status: "ok",
      id: user.id,
    });
  } catch (e) {
    if (e.code === "23505") {
      res.status(500).json({
        status: "fail",
        message: "duplicate user",
      });
    } else {
      res.status(500).json({
        status: "fail",
        message: "internal server error",
      });
    }
  }
});

router.post("/verification", async (req, res) => {
  console.log(req.body);

  const codeData = await VerificationCode.findOne({
    where: { userID: req.body.id },
  });

  if (!codeData) {
    return res.send({
      status: "fail",
      message: "wrong user id",
    });
  }

  console.log(codeData);

  if (req.body.code === codeData!.code) {
    await AppDataSource.createQueryBuilder()
      .update(User)
      .set({ emailVerified: true })
      .where("id = :id", { id: req.body.id })
      .execute();

    await VerificationCode.delete({
      userID: req.session.user,
    });

    return res.json({
      status: "ok",
      message: "account verified",
    });
  } else {
    return res.json({
      status: "fail",
      message: "wrong verification code",
    });
  }
});

router.post("/login", async (req, res) => {
  const userLoginInfo = req.body;

  const user = await AppDataSource.getRepository(User)
    .createQueryBuilder("user")
    .select("user")
    .where({ username: userLoginInfo.username })
    .addSelect("user.password")
    .leftJoinAndSelect("user.address", "address")
    .leftJoinAndSelect("user.cart", "cart")
    .getOne();
  if (user && !user.isBanned) {
    const isPasswordCorrect = await bcrypt.compare(
      userLoginInfo.password,
      user.password
    );

    if (isPasswordCorrect) {
      req.session.user = user.id;
      console.log(req.session);
      res.json({
        status: "ok",
        message: "logged in",
        user: user,
      });
    } else {
      res.json({
        status: "fail",
        message: "password incorrect",
      });
    }
  } else if (user?.isBanned) {
    res.json({
      status: "fail",
      message: "user is banned by admin",
    });
  } else {
    res.json({
      status: "fail",
      message: "no user found",
    });
  }
});

router.get("/me", validateUser, async (req, res) => {
  res.send({
    status: "ok",
    message: "info retrived",
    user: await User.findOne({ where: { id: req.session.user } }),
  });
});

router.get("/presistUser", async (req, res) => {
  const userReq = req.cookies;
  if (userReq.qid) {
    if (req.session.user) {
      const user = await AppDataSource.getRepository(User)
        .createQueryBuilder("user")
        .select("user")
        .where({ id: req.session.user })
        .leftJoinAndSelect("user.address", "address")
        .leftJoinAndSelect("user.cart", "cart")
        .getOne();

      res.json({
        status: "ok",
        message: "user retrieved!",
        user: user,
      });
    } else {
      res.json({
        status: "fail",
        message: "no session found",
      });
    }
  } else {
    res.json({
      status: "fail",
      message: "no cookie found",
    });
  }
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((e) => {
      if (e) {
        res.json({
          status: "fail",
          message: "failed to logout",
        });
      } else {
        res.clearCookie("qid");
        res.json({
          status: "ok",
          message: "logged out successfully",
        });
      }
    });
  } else {
    res.json({
      status: "fail",
      message: "no session found!",
    });
  }
});

router.post("/forgotPassword", async (req, res) => {
  const { email } = req.body as { email: string };
  if (email || email.trim() === "") {
    try {
      const user = await User.findOneByOrFail({
        email: email,
      });
      if (user) {
        const verifyCode = generateCode();
        await VerificationCode.create({
          email,
          userID: user.id,
          code: verifyCode,
        }).save();
        await transporter.sendMail({
          from: process.env.SMTP_PASSWORD, // sender address
          to: email, // list of receivers
          subject: "Verification Email", // Subject line
          text: `YOUR RECOVERY CODE IS ${verifyCode}`, // plain text body
        });
        res.json({
          status: "ok",
          message: "email send",
        });
      } else {
        res.json({
          status: "fail",
          message: "no user found with this email",
        });
      }
    } catch {
      res.json({
        status: "fail",
        message: "failed to send email!",
      });
    }
  } else {
    res.json({
      status: "fail",
      message: "no email found",
    });
  }
});

router.post("/verifyRecoverCode", async (req, res) => {
  const { email, recoverCode } = req.body as {
    email: string;
    recoverCode: string;
  };

  if (email || recoverCode) {
    try {
      const verifyCode = await VerificationCode.findOne({
        where: { email: email },
      });
      if (verifyCode?.code === recoverCode) {
        VerificationCode.delete({
          email: email,
        });
        res.json({
          status: "ok",
          message: "code verified",
        });
      } else {
        res.json({
          status: "fail",
          message: "incorrect recovery code",
        });
      }
    } catch {
      res.json({
        status: "fail",
        message: "failed to verify code",
      });
    }
  } else {
    res.json({
      status: "fail",
      message: "no email or code found",
    });
  }
});

router.post("/setNewForgottenPassword", async (req, res) => {
  const { email, newPass } = req.body as { email: string; newPass: string };

  if (email || newPass) {
    try {
      const user = await AppDataSource.getRepository(User)
        .createQueryBuilder("user")
        .select("user")
        .where({ email: email })
        .addSelect("user.password")
        .getOne();

      const hashPass = await bcrypt.hash(newPass, 12);

      if (user) {
        user.password = hashPass;
        await user.save();

        res.json({
          status: "ok",
          message: "password changed",
        });
      } else {
        res.json({
          status: "fail",
          message: "user not found",
        });
      }
    } catch {
      res.json({
        status: "fail",
        message: "failed to change password",
      });
    }
  }
});

export default router;
