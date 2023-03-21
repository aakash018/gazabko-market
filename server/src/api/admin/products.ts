import express from "express";
import { Category } from "../../entities/admin/Cateogries";
import { ProductPayloadType } from "src/types/global";
import { LessThanOrEqual } from "typeorm";
import { Products } from "../../entities/Products";
import validateAdmin from "../../middleware/validateAdmin";
import { Review } from "../../entities/Review";

const router = express();

router.get("/oneProductDetail", validateAdmin, async (req, res) => {
  const userReq = req.query as unknown as { pid: number };

  try {
    const product = await Products.createQueryBuilder("product")
      .where({ id: userReq.pid })
      // .leftJoinAndSelect("seller.products", "products")
      .loadRelationCountAndMap("product.reviewsCount", "product.review")
      //   .loadRelationCountAndMap("product.", "seller.products")
      .getOne();

    res.json({
      status: "ok",
      message: "product info found",
      product,
    });
  } catch (e) {
    console.log(e);
    res.json({
      status: "fail",
      message: "failed to find products info",
    });
  }
});

router.get("/getAllProducts", validateAdmin, async (_, res) => {
  try {
    const products = await Products.find({
      relations: { seller: true },
      select: {
        id: true,
        seller: {
          storeName: true,
        },
        name: true,
        timesBought: true,
        totalStock: true,
      },
      order: { name: "ASC" },
      take: 10,
    });

    const categories = await Category.find({
      select: {
        name: true,
      },
    });

    res.json({
      status: "ok",
      message: "products found",
      products,
      categories,
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to get data",
    });
  }
});

router.get("/topProducts", validateAdmin, async (_, res) => {
  try {
    const topProducts = await Products.find({
      select: ["id", "name", "store", "timesBought", "totalStock"],
      order: { timesBought: "DESC" },
      take: 10,
    });

    res.json({
      status: "ok",
      message: "products found",
      topProducts,
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to find top products",
    });
  }
});

router.get("/productsOutOfStock", validateAdmin, async (_, res) => {
  try {
    const outOfStockProducts = await Products.find({
      select: ["id", "name", "store", "timesBought", "totalStock"],
      where: { totalStock: LessThanOrEqual(0) },
      order: { name: "ASC" },
      take: 10,
    });

    res.json({
      status: "ok",
      message: "products found",
      outOfStockProducts,
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to find out of stock products",
    });
  }
});

router.post("/addProduct", validateAdmin, async (req, res) => {
  const adminReq = req.body as ProductPayloadType;

  const category = await Category.findOne({
    where: {
      name: adminReq.category,
      subCatagories: {
        name: adminReq.subCategory,
        subsubCategories: {
          name: adminReq.subsubCategory,
        },
      },
    },
    relations: {
      subCatagories: {
        subsubCategories: true,
      },
    },
  });

  try {
    if (category) {
      await Products.create({
        name: adminReq.productName,
        brand: adminReq.brand,
        price: adminReq.price,
        priceAfterDiscount: adminReq.price - adminReq.discount,
        totalStock: adminReq.totalStock,
        description: adminReq.description,
        category: category,
        subCategory: category.subCatagories[0],
        subsubCategory: category.subCatagories[0].subsubCategories[0],
        images: adminReq.images,
        tags: adminReq.tags,
        discount: adminReq.discount,
        sizes: adminReq.sizes,
        store: "admin",
        color: adminReq.color,
        sku: adminReq.sku,
        isByAdmin: true,
      }).save();

      res.json({
        status: "ok",
        message: "product added",
      });
    } else {
      res.json({
        status: "fail",
        message: "failed linking seller or category",
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "failed to add product",
    });
  }
});
router.get("/getProductsWithCat", validateAdmin, async (req, res) => {
  const userReq = req.query as unknown as { category: string };

  try {
    let products;
    if (userReq.category === "All Categories") {
      products = await Products.find({
        relations: { seller: true },
        select: {
          name: true,
          seller: { storeName: true },
          timesBought: true,
          totalStock: true,
          id: true,
        },
      });
    } else {
      products = await Products.find({
        relations: {
          seller: true,
        },
        where: {
          category: {
            name: userReq.category,
          },
        },
        select: {
          id: true,
          seller: {
            storeName: true,
          },
          name: true,
          timesBought: true,
          totalStock: true,
        },
      });
    }

    res.json({
      status: "ok",
      message: "products found",
      products,
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to find products",
    });
  }
});

router.get("/getReviews", validateAdmin, async (_, res) => {
  try {
    const reviews = await Review.find({
      relations: {
        user: true,
        product: true,
      },
      select: {
        id: true,
        review: true,
        rating: true,
        created_at: true,
        product: {
          name: true,
          images: true,
          priceAfterDiscount: true,
        },
        user: {
          firstName: true,
          lastName: true,
          avatar: true,
        },
      },
      order: {
        created_at: "DESC",
      },
      take: 16,
    });

    res.json({
      status: "ok",
      message: "reviews found",
      reviews,
    });
  } catch (e) {
    console.log(e);
    res.json({
      status: "fail",
      message: "failed to find reviews",
    });
  }
});

export default router;
