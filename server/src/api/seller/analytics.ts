import express from "express";
import validateSeller from "../../middleware/validateSeller";
import { Order } from "../../entities/Orders";
import { Follow } from "../../entities/Follow";

const router = express();

router.get("/", validateSeller, async (req, res) => {
  try {
    const result = await Order.createQueryBuilder("entity")
      .leftJoin("entity.product", "product")
      .where({
        status: "delivered",
        product: {
          seller: {
            id: req.session.sellerID,
          },
        },
      })
      .select("DATE_TRUNC('month', entity.created_at::timestamp)", "date")
      .addSelect("SUM(entity.price)", "count")
      .groupBy("date")
      .orderBy("date")
      .getRawMany();

    const monthlyOrder = await Order.createQueryBuilder("entity")
      .leftJoin("entity.product", "product")
      .where({
        product: {
          seller: {
            id: req.session.sellerID,
          },
        },
      })
      .select("DATE_TRUNC('month', entity.created_at::timestamp)", "date")
      .addSelect("COUNT(*)", "count")
      .groupBy("date")
      .orderBy("date")
      .getRawMany();

    const followersByMonth = await Follow.createQueryBuilder("follow")
      .where({ sellerId: req.session.sellerID })
      .select("DATE_TRUNC('month', follow.created_at::timestamp)", "date")
      .addSelect("COUNT(*)", "count")
      .groupBy("date")
      .orderBy("date")
      .getRawMany();

    const totalFollowers = await Follow.createQueryBuilder("follow")
      .where({ sellerId: req.session.sellerID })
      // .select("DATE_TRUNC('month', follow.created_at::timestamp)", "date")
      .select("COUNT(*)", "count")
      .getRawOne();

    const mostSoldProductRaw = await Order.createQueryBuilder("order")
      .leftJoinAndSelect("order.product", "product")
      .leftJoin("product.seller", "seller")
      .where("EXTRACT(month FROM order.created_at) = :month", {
        month: new Date().getMonth(),
      })
      .andWhere("order.status = 'delivered'")
      .andWhere("seller.id = :id", { id: req.session.sellerID })
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

    const ordersCount = await Order.createQueryBuilder("order")
      .leftJoin("order.product", "product")
      .leftJoin("product.seller", "seller")
      .where("seller.id = :id", { id: req.session.sellerID })
      .select("Count(*)", "ordersCount")
      .addSelect("SUM(order.price)", "totalPrice")
      .getRawOne();

    ordersCount["totalFollower"] = totalFollowers.count;

    res.json({
      status: "ok",
      message: "order with months found",
      orderWithMonth: result,
      followersWithMonth: followersByMonth,
      noOfOrdersByMonth: monthlyOrder,
      mostBoughtProductCount,
      totalStats: ordersCount,
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
