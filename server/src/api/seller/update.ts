import express from "express";
import { AppDataSource } from "../../dataSource";
import { Seller } from "../../entities/seller/Seller";
import { ToBeVerified } from "../../entities/seller/ToBeVerified";
import validateSeller from "../../middleware/validateSeller";
import bcrypt from "bcrypt";
const router = express();

interface SellerInfoUpdateReqType {
  username: string;
  storeAddress: string;
  storeName: string;
  contactPerson: string;
  phoneNo: string;
  panNo: string;
  email: string;
}
router.post("/info", validateSeller, async (req, res) => {
  const userReq = req.body as SellerInfoUpdateReqType;

  try {
    await ToBeVerified.create({
      username: userReq.username,
      contactPerson: userReq.contactPerson,
      email: userReq.email,
      phoneNo: userReq.phoneNo,
      panNo: userReq.panNo,
      storeName: userReq.storeName,
      storeAddress: userReq.storeAddress,
      sellerID: req.session.sellerID,
    }).save();

    res.json({
      status: "ok",
      message: "info sent for verification",
    });
  } catch (e) {
    console.log(e);
    res.json({
      status: "fail",
      message: "failed to send data for verification",
    });
  }
});

router.post("/password", validateSeller, async (req, res) => {
  const userReq = req.body as { oldPass: string; newPass: string };

  if (userReq.newPass.length < 8) {
    return res.json({
      status: "fail",
      message: "password too short",
    });
  }

  try {
    const seller = await AppDataSource.getRepository(Seller)
      .createQueryBuilder("seller")
      .select("seller")
      .where({ id: req.session.sellerID })
      .addSelect("seller.password")
      .getOne();

    const isOldPasswordCorrect = await bcrypt.compare(
      userReq.oldPass,
      seller!.password
    );

    if (isOldPasswordCorrect) {
      const hashPass = await bcrypt.hash(userReq.newPass, 12);
      seller!.password = hashPass;
      seller?.save();

      return res.json({
        status: "ok",
        message: "password changed",
      });
    } else {
      return res.json({
        status: "fail",
        message: "old password didn't match",
      });
    }
  } catch {
    return res.json({
      status: "fail",
      message: "failed to update password",
    });
  }
});

export default router;
