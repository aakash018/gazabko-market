import express from "express";
import { Seller } from "../../entities/Seller";

import bcrypt, { hash } from "bcrypt";

const router = express();

interface SellerRegisterData {
  username: string;
  email: string;
  storeName: string;
  address: string;
  password: string;
  contactPerson: string;
  phoneNo: number;
  panNo: number;
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

router.get("/login", (_, res) => {
  res.send("HERE");
});

router.post("/login", async (req, res) => {
  const sellerInputData: { usernme: string; password: string } = req.body;

  const seller = await Seller.findOne({
    where: { username: sellerInputData.usernme },
  });

  if (seller && seller.isVerified !== false) {
    const isPasswordMatched = await bcrypt.compare(
      sellerInputData.password,
      seller.password
    );

    if (isPasswordMatched) {
      Reflect.deleteProperty(seller, "password");

      req.session.sellerID = seller.id;
      res.json({
        status: "ok",
        message: "logged in sucessfully",
        seller: seller,
      });
    } else {
      res.json({
        stayus: "fail",
        message: "passsword didnot match",
      });
    }
  } else {
    res.json({
      stayus: "fail",
      message: "seller not found",
    });
  }
});

export default router;
