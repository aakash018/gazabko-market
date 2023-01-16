import express from "express";
import { Seller } from "../../entities/seller/Seller";
import { Products } from "../../entities/Products";

import sanitizeHtml from "sanitize-html";
import validateSeller from "../../middleware/validateSeller";
import { Equal, LessThanOrEqual } from "typeorm";
import { Review } from "../../entities/Review";
import { Question } from "../../entities/QuestionAndAnswer";

const router = express();

interface ProtuctPayloadType {
  productName: string;
  price: number;
  discount: number;
  description: string;
  totalStock: number;
  offer?: string;
  sizes?: string;
  tags: string;
  category: string;
  subCategory: string;
  subsubCategory?: string;
  sku: number;
  brand: string;
  images: string;
  store: string;
  color: string;
}

router.get("/", async (_, res) => {
  const products = await Products.find({});

  res.json({
    status: "ok",
    message: "prducts found",
    products: products,
  });
});

router.post("/add", validateSeller, async (req, res) => {
  const productDetails: ProtuctPayloadType = req.body;
  const cleanDesc = sanitizeHtml(productDetails.description);
  if (req.session.user) {
    const seller = await Seller.findOne({
      where: { id: req.session.user },
    });
    try {
      if (seller && seller.isVerified) {
        const product = await Products.create({
          brand: productDetails.brand,
          category: productDetails.category,
          name: productDetails.productName,
          price: productDetails.price,
          description: cleanDesc,
          offers: productDetails.offer,
          totalStock: productDetails.totalStock,
          store: seller.storeName,
          sku: productDetails.sku,
          sizes: productDetails.sizes,
          images: productDetails.images,
          tags: productDetails.tags,
          discount: productDetails.discount,
          seller: seller,
          color: productDetails.color,
          priceAfterDiscount: productDetails.price - productDetails.discount,
        }).save();
        console.log(product);
      }
      res.json({
        status: "ok",
        message: "product added",
      });
    } catch {
      res.send({
        status: "fail",
        message: "failed to add product",
      });
    }
  } else {
    res.json({
      status: "fail",
      message: "not auth",
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
  } catch {
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
    });

    res.json({
      status: "ok",
      message: "counts loaded",
      count: { outOfStock, total, reviews, questions },
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to load counts",
    });
  }
});

// router.get("/getProductsWithCat", validateSeller, async(req,res) => {
//   const userReq = req.query as unknown as {category: string}

//   try {
//     let products;
//     if(userReq.category === "All Products") {
//       products = await Products.find({take: 10, where: {seller: {id: req.session.sellerID}}})
//     } else {
//       products = await Products.find({
//         where: {seller: {id: req.session.sellerID},
//         category:

//       }
//       })
//     }
//   } catch {

//   }
// });

export default router;
