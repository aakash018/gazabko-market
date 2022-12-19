import express from "express";
import { AppDataSource } from "..//dataSource";
import { Address } from "../entities/Address";
import { User } from "../entities/User";

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
    const address = new Address();
    address.deliveryAddress = userData.delivaryAdd;
    address.laglat = userData.mapCods;
    address.nearestLandmark = userData.nearestLandmark;

    await AppDataSource.manager.save(address);

    const user = new User();

    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
    user.gender = userData.gender;
    user.password = userData.password;
    user.username = userData.username;
    user.email = userData.email;
    user.phoneNo = userData.phone;
    user.address = address;

    await AppDataSource.manager.save(user);

    console.log(
      await AppDataSource.getRepository(User).find({
        relations: {
          address: true,
        },
      })
    );

    res.json({
      status: "ok",
      message: "code: XV173VT",
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
  if (req.body.code === "XV173VT") {
    await AppDataSource.createQueryBuilder()
      .update(User)
      .set({ emailVerified: true })
      .where("id = :id", { id: req.body.id })
      .execute();

    res.json({
      status: "ok",
      message: "account verified",
    });
  }
});

export default router;
