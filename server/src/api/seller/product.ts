import express from "express";
import { Products } from "src/entities/Products";

const router = express();

interface ProtuctPayloadType {
  productName: string;
  price: number;
  discount?: number;
  description?: string;
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
}

router.post("/add", async (req, res) => {
  const productDetails: ProtuctPayloadType = req.body;

  try {
    const product = await Products.create({
      brand: productDetails.brand,
      category: productDetails.category,
      name: productDetails.productName,
      price: productDetails.price,
      description: productDetails.description,
      offers: productDetails.offer,
      totalStock: productDetails.totalStock,
      store: productDetails.store,
      sku: productDetails.sku,
      sizes: productDetails.sizes,
      images: productDetails.images,
      tags: productDetails.tags,
      discount: productDetails.discount,
    }).save();

    console.log(product);
  } catch {
    res.send({
      status: "fail",
      message: "failed to add product",
    });
  }
});

export default router;
