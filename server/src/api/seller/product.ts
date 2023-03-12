import express from "express";
import { Seller } from "../../entities/seller/Seller";
import { Products } from "../../entities/Products";

import sanitizeHtml from "sanitize-html";
import validateSeller from "../../middleware/validateSeller";
import { Equal, LessThanOrEqual } from "typeorm";
import { Review } from "../../entities/Review";
import { Question } from "../../entities/QuestionAndAnswer";
import { ProductPayloadType } from "../../types/global";
import { Category } from "../../entities/admin/Cateogries";

const router = express();

router.get("/", async (_, res) => {
  const products = await Products.find({
    where: { isHidden: false },
    relations: {
      offers: true,
    },
  });

  res.json({
    status: "ok",
    message: "prducts found",
    products: products,
  });
});

router.get("/getAllProducts", validateSeller, async (req, res) => {
  try {
    const products = await Products.find({
      where: { seller: { id: req.session.sellerID } },
      select: {
        id: true,
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

router.post("/add", validateSeller, async (req, res) => {
  const productDetails: ProductPayloadType = req.body;

  const cleanDesc = sanitizeHtml(productDetails.description);

  try {
    const seller = await Seller.findOne({
      where: { id: req.session.sellerID },
    });

    const category = await Category.findOne({
      where: {
        name: productDetails.category,
        subCatagories: {
          name: productDetails.subCategory,
          subsubCategories: {
            name: productDetails.subsubCategory,
          },
        },
      },
      relations: {
        subCatagories: {
          subsubCategories: true,
        },
      },
    });

    if (seller && seller.isVerified && category) {
      await Products.create({
        brand: productDetails.brand,
        name: productDetails.productName,
        price: productDetails.price,
        description: cleanDesc,
        totalStock: productDetails.totalStock,
        store: seller.storeName,
        category: category,
        subCategory: category.subCatagories[0],
        subsubCategory: category.subCatagories[0].subsubCategories[0],
        sku: productDetails.sku,
        sizes: productDetails.sizes,
        images: productDetails.images,
        tags: productDetails.tags,
        discount: productDetails.discount,
        seller: seller,
        color: productDetails.color,
        priceAfterDiscount: productDetails.price - productDetails.discount,
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

router.get("/info", async (req, res) => {
  const parsedData = req.query as unknown as { pid: number };

  try {
    const product = await Products.findOneOrFail({
      where: { id: parsedData.pid },
      relations: {
        seller: true,
        offers: true,
      },
    });

    if (product) {
      res.json({
        status: "ok",
        message: "product found",
        product: product,
      });
    } else {
      res.json({
        status: "fail",
        message: "no product found",
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "failed to find the product",
    });
  }
});

router.get("/topSellingProducts", validateSeller, async (req, res) => {
  try {
    const products = await Products.find({
      where: { seller: { id: req.session.sellerID } },
      // select: {
      //   name: true,
      //   timesBought: true,
      //   totalStock: true,
      //   rating: true,
      //   brand: true,
      // },
      order: { timesBought: "DESC" },
      skip: 0,
      take: 10,
    });
    if (products) {
      res.json({
        status: "ok",
        message: "products found",
        products,
      });
    } else {
      res.json({
        status: "fail",
        message: "products not found",
      });
    }
  } catch (e) {
    console.log(e);
    res.json({
      status: "fail",
      message: "failed to find products",
    });
  }
});

router.get("/outOfStock", validateSeller, async (req, res) => {
  try {
    const products = await Products.find({
      where: {
        seller: { id: req.session.sellerID },
        totalStock: LessThanOrEqual(0),
      },
    });

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

router.get("/getProductsCount", validateSeller, async (req, res) => {
  try {
    const outOfStock = await Products.countBy({
      totalStock: Equal(0),
      seller: { id: req.session.sellerID },
    });
    const total = await Products.countBy({
      seller: { id: req.session.sellerID },
    });
    const reviews = await Review.countBy({
      product: { seller: { id: req.session.sellerID } },
    });
    const questions = await Question.countBy({
      product: { seller: { id: req.session.sellerID } },
      answered: false,
    });
    const hiddenProducts = await Products.countBy({
      seller: { id: req.session.sellerID },
      isHidden: true,
    });
    res.json({
      status: "ok",
      message: "counts loaded",
      count: { outOfStock, total, reviews, questions, hiddenProducts },
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to load counts",
    });
  }
});

router.get("/getReviews", validateSeller, async (req, res) => {
  try {
    const reviews = await Review.find({
      where: { product: { seller: { id: req.session.sellerID } } },
      relations: {
        product: true,
        user: true,
      },
    });
    if (reviews) {
      res.json({
        status: "ok",
        message: "reviews found",
        reviews,
      });
    } else {
      res.json({
        status: "fail",
        message: "no reviews found",
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "failed to load reviews",
    });
  }
});

router.get("/getQuestions", validateSeller, async (req, res) => {
  try {
    const questions = await Question.find({
      where: {
        product: { seller: { id: req.session.sellerID } },
        answered: false,
      },
      relations: {
        product: true,
        user: true,
      },
    });
    if (questions) {
      res.json({
        status: "ok",
        message: "questions asked",
        questions,
      });
    } else {
      res.json({
        status: "fail",
        message: "no reviews found",
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "failed to load questions  ",
    });
  }
});

router.post("/addAnswer", validateSeller, async (req, res) => {
  const userReq = req.body as { answer: string; questionId: number };
  console.log(userReq);
  if (userReq.answer && userReq.questionId) {
    try {
      await Question.update(
        { id: userReq.questionId },
        { answer: userReq.answer, answered: true }
      );
      res.json({
        status: "ok",
        message: "question updated",
      });
    } catch {
      res.json({
        status: "fail",
        message: "failed to add answer",
      });
    }
  } else {
    res.json({
      status: "fail",
      message: "no user data found",
    });
  }
});

router.put("/hideProduct", validateSeller, async (req, res) => {
  const userReq = req.body as { productID: number };
  try {
    await Products.update({ id: userReq.productID }, { isHidden: true });
    res.json({
      status: "ok",
      message: "product now hidden",
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to hide product",
    });
  }
});

router.put("/unhideProduct", validateSeller, async (req, res) => {
  const userReq = req.body as { productID: number };
  try {
    await Products.update({ id: userReq.productID }, { isHidden: false });
    res.json({
      status: "ok",
      message: "product now unhidden",
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to unhide product",
    });
  }
});

router.get("/hiddenProducts", validateSeller, async (req, res) => {
  try {
    const hiddenProducts = await Products.find({
      where: {
        seller: { id: req.session.sellerID },
        isHidden: true,
      },
    });
    res.json({
      status: "ok",
      message: "products found",
      hiddenProducts,
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to find products",
    });
  }
});

router.get("/getProductsWithCat", validateSeller, async (req, res) => {
  const userReq = req.query as unknown as { category: string };

  try {
    let products;
    if (userReq.category === "All Categories") {
      products = await Products.find({
        where: { seller: { id: req.session.sellerID } },
      });
    } else {
      products = await Products.find({
        where: {
          seller: { id: req.session.sellerID },
          category: {
            name: userReq.category,
          },
        },
        select: {
          name: true,
          timesBought: true,
          totalStock: true,
        },
      });

      // console.table(
      //   await Products.find({
      //     select: {
      //       name: true,
      //       category: {
      //         name: true,
      //       },
      //     },
      //     relations: {
      //       category: true,
      //     },
      //   })
      // );
    }
    console.log(products);
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

export default router;
