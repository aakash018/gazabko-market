import express from "express";
import validateAdmin from "src/middleware/validateAdmin";

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
  } catch {}
});

export default router;
