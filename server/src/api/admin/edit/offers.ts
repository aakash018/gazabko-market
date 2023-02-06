import express from "express";
import { Products } from "../../../entities/Products";
import { Offers } from "../../../entities/admin/Offers";
import validateAdmin from "../../../middleware/validateAdmin";

const router = express();

interface OfferAddPayloadType {
  name: string;
  startingDate: Date;
  endingDate: Date;
  show_on_homepage: boolean;
  common_discount: boolean;
  discount: number;
}

router.post("/addOffer", validateAdmin, async (req, res) => {
  const adminReq = req.body as OfferAddPayloadType;

  try {
    await Offers.create({
      name: adminReq.name,
      starting_date: adminReq.startingDate,
      ending_date: adminReq.endingDate,
      show_on_homepage: adminReq.show_on_homepage,
      common_discount: adminReq.common_discount,
      discount: adminReq.discount,
    }).save();

    res.json({
      status: "ok",
      message: "offer added successfully",
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to add offer in server",
    });
  }
});

router.put("/updateOffer", validateAdmin, async (req, res) => {
  const adminReq = req.body as OfferAddPayloadType & { id: string };

  try {
    await Offers.update(
      {
        id: adminReq.id,
      },
      {
        name: adminReq.name,
        discount: adminReq.discount,
        common_discount: adminReq.common_discount,
        ending_date: adminReq.endingDate,
        show_on_homepage: adminReq.show_on_homepage,
        starting_date: adminReq.startingDate,
      }
    );

    res.json({
      status: "ok",
      message: "offer updated",
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed tto update offer",
    });
  }
});

router.get("/getOffers", validateAdmin, async (_, res) => {
  try {
    const offers = await Offers.find({
      relations: { products: true },
      select: {
        id: true,
        name: true,
        common_discount: true,
        ending_date: true,
        show_on_homepage: true,
        starting_date: true,
        discount: true,
        products: {
          name: true,
          sku: true,
        },
      },
    });

    res.json({
      status: "ok",
      message: "offers found",
      offers,
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to find offers",
    });
  }
});

router.delete("/deleteOffer", validateAdmin, async (req, res) => {
  const adminReq = req.query as unknown as { offerID: string };

  try {
    await Offers.delete({
      id: adminReq.offerID,
    });

    res.json({
      status: "ok",
      message: "offer deleted successfully",
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to delete offer",
    });
  }
});

router.post("/addProducts", validateAdmin, async (req, res) => {
  const adminReq = req.body as { pSKU: number; offerID: string };

  try {
    const product = await Products.findOne({
      where: { sku: adminReq.pSKU },
      relations: {
        offers: true,
      },
    });

    const offer = await Offers.findOne({
      where: { id: adminReq.offerID },
      relations: { products: true },
    });

    if (offer?.products && product) {
      if (product.offers === null) {
        offer.products = offer.products.concat(product);
        await offer.save();
        res.json({
          status: "ok",
          message: "product added",
          productName: product.name,
        });
      } else {
        res.json({
          status: "fail",
          message: "product already has a offer",
        });
      }
    } else {
      res.json({
        status: "fail",
        message: "offer or product not found",
      });
    }
  } catch {
    res.json({
      status: "fail",
      message: "failed to update products",
    });
  }
});

export default router;
