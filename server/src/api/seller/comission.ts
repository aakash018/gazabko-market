import express from "express";
import { Category } from "../../entities/admin/Cateogries";
import { SubCategory } from "../../entities/admin/SubCategories";
import validateSeller from "../../middleware/validateSeller";

const router = express();

router.get("/getCategoryCommission", validateSeller, async (_, res) => {
  try {
    const categories = await Category.find({
      relations: {
        subCatagories: true,
      },
      select: {
        name: true,
        commission: true,
        subCatagories: {
          name: true,
          commission: true,
        },
      },
    });

    const subCategory: SubCategory[] = [];

    categories.forEach((category) => {
      category.subCatagories.forEach((subcat) => {
        if (subcat.commission !== 0) {
          (subcat as any).category = category.name;
          subCategory.push(subcat);
        }
      });
    });

    // const filteredCategory = subCategory.filter((subCat) => subCat.)

    res.json({
      status: "ok",
      message: "categories found",
      categories,
      subCategory,
    });
  } catch (e) {
    console.log(e);
    res.json({
      status: "fail",
      message: "failed to find commissions",
    });
  }
});

export default router;
