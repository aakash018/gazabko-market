import express from "express";
import { Seller } from "../../entities/Seller";
import { Products } from "../../entities/Products";

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

  if (req.session.sellerID) {
    const seller = await Seller.findOne({
      where: { id: req.session.sellerID },
    });
    try {
      if (seller && seller.isVerified) {
        const product = await Products.create({
          brand: productDetails.brand,
          category: productDetails.category,
          name: productDetails.productName,
          price: productDetails.price,
          description: productDetails.description,
          offers: productDetails.offer,
          totalStock: productDetails.totalStock,
          store: seller.storeName,
          sku: productDetails.sku,
          sizes: productDetails.sizes,
          images: productDetails.images,
          tags: productDetails.tags,
          discount: productDetails.discount,
          seller: seller,
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

export default router;
