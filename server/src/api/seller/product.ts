import express from "express";
import { Seller } from "../../entities/seller/Seller";
import { Products } from "../../entities/Products";

import sanitizeHtml from "sanitize-html";
import validateSeller from "../../middleware/validateSeller";

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

router.get("/info", validateSeller, async (req, res) => {
  const parsedData = req.query as unknown as { id: number };

  const product = await Products.findOne({
    where: { id: parsedData.id },
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
});

router.get("/topSellingProducts", validateSeller, async (req, res) => {
  try {
    const products = await Products.find({
      where: { seller: { id: req.session.sellerID } },
      order: { timesBought: "DESC" },
      select: {
        name: true,
        timesBought: true,
        totalStock: true,
        rating: true,
        brand: true,
      },
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

export default router;
