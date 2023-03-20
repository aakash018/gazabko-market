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

    const followers = await Follow.createQueryBuilder("follow")
      .where({ sellerId: req.session.sellerID })
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
      .andWhere("seller.id = :id", { id: req.session.sellerID })
      .select("product.name")
      .groupBy("product.id, order.id")
      .orderBy("count(product.id)", "ASC")
      .getRawMany();

    // const topCategories = await Order.createQueryBuilder("order")
    //   .leftJoinAndSelect("order.product", "product")
    //   .leftJoin("product.seller", "seller")
    //   .leftJoin("product.category", "category")
    //   .where("EXTRACT(month FROM order.created_at) = :month", {
    //     month: new Date().getMonth(),
    //   })
    //   .andWhere("order.status = 'delivered'")
    //   .andWhere("seller.id = :id", { id: req.session.sellerID })
    //   .select("category.name")
    //   .addSelect("SUM(order.price)", "count")
    //   .groupBy("category.id, order.id")
    //   .orderBy("count(category.id)", "ASC")
    //   .getRawMany();

    // console.log(topCategories);

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
      noOfOrdersByMonth: monthlyOrder,
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
