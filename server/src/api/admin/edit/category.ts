import express from "express";
import { Category } from "../../../entities/admin/Cateogries";
import { SubCategory } from "../../../entities/admin/SubCategories";
import { SubSubCategory } from "../../../entities/admin/SubSubCategory";
import validateAdmin from "../../../middleware/validateAdmin";

const router = express();

interface AddReqType {
  categoryName: string;
  commision: number;
  subCategory: string[];
  subCategoryCommision: { item: string; commission: string }[];
  subsubCats: { item: string; subsubCats: string }[];
}
router.post("/add", validateAdmin, async (req, res) => {
  const adminReq = req.body as AddReqType;

  try {
    const cat = Category.create({
      name: adminReq.categoryName,
      commission: adminReq.commision,
    });

    const subCats = adminReq.subCategory.map((name) => {
      return SubCategory.create({
        name: name,
        // choose the requried commission for subCat
        commission:
          parseInt(
            adminReq.subCategoryCommision.filter((ele) => ele.item === name)[0]
              .commission
          ) | 0,
        subsubCategories: adminReq.subsubCats
          .filter((cat) => cat.item === name)
          .map((cat) =>
            SubSubCategory.create({
              name: cat.subsubCats,
            })
          ),
      });
    });

    cat.subCatagories = subCats;

    await cat.save();

    res.json({
      status: "ok",
      message: "category created",
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to add category",
    });
  }
});

export default router;
