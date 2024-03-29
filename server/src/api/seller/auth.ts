import express from "express";
import { Seller } from "../../entities/seller/Seller";

import bcrypt, { hash } from "bcrypt";
import { AppDataSource } from "../../dataSource";
import validateSeller from "../../middleware/validateSeller";

const router = express();

interface SellerRegisterData {
  username: string;
  email: string;
  storeName: string;
  address: string;
  password: string;
  contactPerson: string;
  phoneNo: string;
  panNo: string;
}

router.post("/sellerRegister", async (req, res) => {
  const sellerData: SellerRegisterData = req.body;

  const hashPass = await hash(sellerData.password, 12);

  try {
    await Seller.create({
      username: sellerData.username,
      email: sellerData.email,
      storeName: sellerData.storeName,
      address: sellerData.address,
      password: hashPass,
      contactPerson: sellerData.contactPerson,
      phoneNo: sellerData.phoneNo,
      panNo: sellerData.panNo,
    }).save();

    res.send({
      status: "ok",
      message: "verification request sent",
    });
  } catch {
    res.send({
      status: "fail",
      message: "failed to save seller info",
    });
  }
});

router.post("/login", async (req, res) => {
  const sellerInputData: { username: string; password: string } = req.body;

  const seller = await AppDataSource.getRepository(Seller)
    .createQueryBuilder("seller")
    .select("seller")
    .where({ username: sellerInputData.username })
    .addSelect("seller.password")
    .getOne();

  if (seller && !seller.isBanned) {
    const isPasswordMatched = await bcrypt.compare(
      sellerInputData.password,
      seller.password
    );
    if (seller.isVerified) {
      if (isPasswordMatched) {
        req.session.sellerID = seller.id;
        Reflect.deleteProperty(seller, "password");
        res.json({
          status: "ok",
          message: "logged in successfully",
          user: seller,
        });
      } else {
        res.json({
          status: "fail",
          message: "password didn't match",
        });
      }
    } else {
      res.json({
        status: "fail",
        message: "seller not verified",
      });
    }
  } else if (seller?.isBanned) {
    res.json({
      status: "fail",
      message: "seller banned by admin",
    });
  } else {
    res.json({
      status: "fail",
      message: "seller not found",
    });
  }
});

router.get("/me", validateSeller, async (req, res) => {
  try {
    const seller = await Seller.findOne({
      where: {
        id: req.session.sellerID,
      },
      select: {
        username: true,
        storeName: true,
        address: true,
        contactPerson: true,
        phoneNo: true,
        email: true,
        panNo: true,
      },
    });

    res.json({
      status: "ok",
      message: "data found",
      seller,
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to find data",
    });
  }
});

export default router;
