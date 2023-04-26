import express from "express";
import { Seller } from "../../entities/seller/Seller";
import { Order } from "../../entities/Orders";
import { User } from "../../entities/User";
import validateAdmin from "../../middleware/validateAdmin";

const router = express();

router.get("/", validateAdmin, async (_, res) => {
  try {
    const result = await Order.createQueryBuilder("entity")
      .leftJoin("entity.product", "product")
      .where("entity.status = :status", { status: "delivered" })
      .select("DATE_TRUNC('month', entity.created_at::timestamp)", "date")
      .addSelect("SUM(entity.price)", "count")
      .groupBy("date")
      .orderBy("date")
      .getRawMany();

    // const monthlyOrder = await Order.createQueryBuilder("entity")
    //   .leftJoin("entity.product", "product")
    //   .where({
    //     status: "delivered",
    //   })
    //   .select("DATE_TRUNC('month', entity.created_at::timestamp)", "date")
    //   .addSelect("COUNT(*)", "count")
    //   .groupBy("date")
    //   .orderBy("date")
    //   .getRawMany();
    const followers = await User.createQueryBuilder("follow")
      .select("DATE_TRUNC('month', follow.created_at::timestamp)", "date")
      .addSelect("COUNT(*)", "count")
      .groupBy("date")
      .orderBy("date")
      .getRawMany();

    const seller = await Seller.createQueryBuilder("follow")
      .select("DATE_TRUNC('month', follow.created_at::timestamp)", "date")
      .addSelect("COUNT(*)", "count")
      .groupBy("date")
      .orderBy("date")
      .getRawMany();

    const mostSoldProductRaw = await Order.createQueryBuilder("order")
      .leftJoinAndSelect("order.product", "product")
      .leftJoin("product.seller", "seller")
      .where("EXTRACT(month FROM order.created_at) = :month", {
        month: new Date().getMonth(),
      })
      .andWhere("order.status = 'delivered'")
      .select("product.name")
      .groupBy("product.id, order.id")
      .orderBy("count(product.id)", "ASC")
      .getRawMany();

    let mostBoughtProductCount: { [key: string]: number } = {};

    mostSoldProductRaw.forEach((product) => {
      if (mostBoughtProductCount[product.product_name]) {
        mostBoughtProductCount[product.product_name] =
          mostBoughtProductCount[product.product_name] + 1;
      } else {
        mostBoughtProductCount[product.product_name] = 1;
      }
    });

    res.json({
      status: "ok",
      message: "order with months found",
      orderWithMonth: result,
      followersWithMonth: followers,
      noOfOrdersByMonth: seller,
      mostBoughtProductCount,
    });
  } catch (e) {
    console.log(e);
    res.json({
      status: "fail",
      message: "failed to find data",
    });
  }
});

export default router;
