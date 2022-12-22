import express from "express";
import { AppDataSource } from "..//dataSource";
import { Address } from "../entities/Address";
import { User } from "../entities/User";

import nodemailer from "nodemailer";
import { generateCode } from "../../utils/generateRandomCode";
import { VerificationCode } from "../entities/VerificationCode";

import bcrypt from "bcrypt";
import validateUser from "../middleware/validateUser";

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

  try {
    const address = new Address();
    address.deliveryAddress = userData.delivaryAdd;
    address.laglat = userData.mapCods;
    address.nearestLandmark = userData.nearestLandmark;

    await AppDataSource.manager.save(address);

    const hashPass = await bcrypt.hash(userData.password, 12);
    const user = new User();

    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
    user.gender = userData.gender;
    user.password = hashPass;
    user.username = userData.username;
    user.email = userData.email;
    user.phoneNo = userData.phone;
    user.address = address;

    await AppDataSource.manager.save(user);

    // ! TO REMOVE
    console.log(
      await AppDataSource.getRepository(User).find({
        relations: {
          address: true,
        },
      })
    );

    const verifyCode = generateCode();

    await VerificationCode.create({
      userID: user.id,
      code: verifyCode,
    }).save();

    transporter
      .sendMail({
        from: process.env.SMTP_PASSWORD, // sender address
        to: userData.email, // list of receivers
        subject: "Medium @edigleyssonsilva ✔", // Subject line
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
  const codeData = await VerificationCode.findOne({
    where: { userID: req.body.id },
  });

  if (!codeData) {
    return res.send({
      status: "fail",
      message: "wrong user id",
    });
  }

  if (req.body.code === codeData!.code) {
    await AppDataSource.createQueryBuilder()
      .update(User)
      .set({ emailVerified: true })
      .where("id = :id", { id: req.body.id })
      .execute();

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
  console.table(await User.find({}));
  const user = await User.findOne({
    where: { username: userLoginInfo.username },
    relations: {
      address: true,
    },
  });
  if (user) {
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

export default router;
