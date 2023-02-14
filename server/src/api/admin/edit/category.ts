import express from "express";
import { AppDataSource } from "../../../dataSource";
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
        commission: adminReq.subCategoryCommision.filter(
          (ele) => ele.item === name
        )[0]
          ? parseInt(
              adminReq.subCategoryCommision.filter(
                (ele) => ele.item === name
              )[0].commission
            )
          : 0,
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
  } catch (e) {
    console.log(e);
    res.json({
      status: "fail",
      message: "failed to add category",
    });
  }
});

router.get("/getAllCategories", async (_, res) => {
  try {
    const categories = await Category.find({
      relations: {
        subCatagories: {
          subsubCategories: true,
        },
      },
      select: ["name", "id"],
    });

    res.json({
      status: "ok",
      message: "categories found",
      categories,
    });
  } catch (e) {
    console.log(e);
    res.json({
      status: "fail",
      message: "failed to find categories",
    });
  }
});

router.get("/getCatsForTable", async (_, res) => {
  try {
    const categories = await AppDataSource.getRepository(Category)
      .createQueryBuilder("category")
      .loadRelationCountAndMap("productCount", "category.products")
      .loadRelationCountAndMap("sellerCount", "category.seller")
      .leftJoinAndSelect("category.subCatagories", "subCatagories")
      .leftJoinAndSelect(
        "category.subCatagories.subsubCategories",
        "subCatagories.subsubCategories"
      )
      .getMany();

    res.json({
      status: "ok",
      message: "found",
      categories,
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to load category",
    });
  }
});

export default router;
