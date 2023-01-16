import express from "express";
import { Address } from "../entities/Address";
import { User } from "../entities/User";
import validateUser from "../middleware/validateUser";

const router = express();

router.get("/getAllAddress", validateUser, async (req, res) => {
  try {
    const addressesWithUser = await User.findOne({
      where: { id: req.session.user },
      relations: {
        address: true,
      },
    });
    console.log(addressesWithUser);
    if (addressesWithUser) {
      res.json({
        status: "ok",
        message: "address found",
        address: addressesWithUser.address,
      });
    } else {
      res.json({
        status: "fail",
        message: "address not found",
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "failed to find address",
    });
  }
});

interface UserAddressReqType {
  phoneNo: string;
  deliveryAddress: string;
  laglng: string;
  nearestLandmark: string;
}
router.post("/addAddress", validateUser, async (req, res) => {
  const userReq = req.body as UserAddressReqType;
  const user = await User.findOne({ where: { id: req.session.user } });
  try {
    if (user) {
      await Address.create({
        deliveryAddress: userReq.deliveryAddress,
        latlng: userReq.laglng,
        nearestLandmark: userReq.nearestLandmark,
        phoneNo: userReq.phoneNo,
        user: user,
      }).save();
      res.json({
        status: "ok",
        message: "address saved",
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
      message: "failed to save address",
    });
  }
});

router.get("/getOneAddressInfo", validateUser, async (req, res) => {
  const userQuery = req.query as unknown as { addressID: number };
  try {
    const address = await Address.findOne({
      where: {
        id: userQuery.addressID,
        user: { id: req.session.user },
      },
    });
    if (address) {
      res.json({
        status: "ok",
        message: "address info found",
        address,
      });
    } else {
      res.json({
        status: "fail",
        message: "address not found",
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "failed to get address info",
    });
  }
});

interface EditAddressUser {
  addressID: number;
  deliveryAddress: string;
  nearestLandmark: string;
  phoneNo: string;
}

router.post("/editAddress", validateUser, async (req, res) => {
  const userReq = req.body as EditAddressUser;
  console.log("USER_REQ", userReq);
  try {
    const prevAddress = await Address.findOne({
      where: {
        id: userReq.addressID,
        user: { id: req.session.user },
      },
    });
    if (prevAddress) {
      prevAddress.nearestLandmark = userReq.nearestLandmark;
      prevAddress.deliveryAddress = userReq.deliveryAddress;
      prevAddress.phoneNo = userReq.phoneNo;

      await prevAddress.save();

      res.json({
        status: "ok",
        message: "address updated",
      });
    } else {
      res.json({
        status: "fail",
        message: "no previous address found",
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "failed to update address in server",
    });
  }
});

router.delete("/deleteAddress", validateUser, async (req, res) => {
  const userReq = req.query as unknown as { addressID: number };

  try {
    await Address.delete({
      user: { id: req.session.user },
      id: userReq.addressID,
    });

    res.json({
      status: "ok",
      message: "address deleted",
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to delete address",
    });
  }
});

export default router;
