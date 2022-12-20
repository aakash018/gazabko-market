import express from "express";
import { Seller } from "../../entities/Seller";

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
  console.log(sellerData);

  try {
    await Seller.create({
      username: sellerData.username,
      email: sellerData.email,
      storeName: sellerData.storeName,
      address: sellerData.address,
      password: sellerData.password,
      contactPerson: sellerData.contactPerson,
      phoneNo: sellerData.phoneNo,
      panNo: sellerData.panNo,
    }).save();

    res.send({
      status: "ok",
      message: "verification reqquest sent",
    });
  } catch {
    res.send({
      status: "fail",
      message: "failed to save seller info",
    });
  }
});

export default router;
