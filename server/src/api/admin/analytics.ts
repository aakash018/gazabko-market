import express from "express";
import validateSeller from "../../middleware/validateSeller";
import { Order } from "../../entities/Orders";
import { Follow } from "../../entities/Follow";
import { Products } from "../../entities/Products";
import { User } from "src/entities/User";

const router = express();

router.get("/", validateSeller, async (req, res) => {
  try {
    const result = await Order.createQueryBuilder("entity")
      .leftJoin("entity.product", "product")
      .select("DATE_TRUNC('month', entity.created_at::timestamp)", "date")
      .addSelect("SUM(entity.price)", "count")
      .groupBy("date")
      .orderBy("date")
      .getRawMany();

    const monthlyOrder = await Order.createQueryBuilder("entity")
      .leftJoin("entity.product", "product")
      .where({
        status: "delivered",
      })
      .select("DATE_TRUNC('month', entity.created_at::timestamp)", "date")
      .addSelect("COUNT(*)", "count")
      .groupBy("date")
      .orderBy("date")
      .getRawMany();
    const followers = await User.createQueryBuilder("follow")
      .select("DATE_TRUNC('month', follow.created_at::timestamp)", "date")
      .addSelect("COUNT(*)", "count")
      .groupBy("date")
      .orderBy("date")
      .getRawMany();

    // const mostSoldProduct = await Order.createQueryBuilder("order")
    //   .where("EXTRACT(month FROM order.created_at) = :month", {
    //     month: new Date().getMonth(),
    //   })
    //   .leftJoinAndSelect("order.product", "product")
    //   .select("product.name, COUNT(product.name) as count")
    //   //   .addSelect("COUNT(product.id)", "count")
    //   .groupBy("product.id, order.id")
    //   .orderBy("count(product.id)", "ASC")
    //   //   .limit(3)
    //   .getRawMany();

    // const mostSoldProduct = await Products.createQueryBuilder("product")
    //   .leftJoinAndSelect("product.order", "order")
    //   .where("EXTRACT(month FROM order.created_at) = :month", {
    //     month: new Date().getMonth(),
    //   })
    //   .loadRelationCountAndMap("product.orderCount", "order")
    //   .select(["product.name"])
    //   .groupBy("product.name, order.id")
    //   .getRawMany();

    // console.log(mostSoldProduct);

    res.json({
      status: "ok",
      message: "order with months found",
      orderWithMonth: result,
      followersWithMonth: followers,
      noOfOrdersByMonth: monthlyOrder,
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
