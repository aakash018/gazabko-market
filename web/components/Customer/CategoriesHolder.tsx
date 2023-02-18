import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../styles/components/Customer/CategoriesHolder.module.scss";
import { Category, SubCategory, SubSubCategory } from "../../@types/global";
import axios from "axios";
import { useAlert } from "../../pages/_app";

const GrandCategories = ({
  grandCategory,
  category,
  subCategory,
}: {
  grandCategory: SubSubCategory;
  category: Category;
  subCategory: SubCategory;
}) => {
  return (
    <div className={styles.bannerSliderGrandCategoriesDiv}>
      <Link
        href={`/catogries/${encodeURIComponent(
          category.name
        )}/${encodeURIComponent(subCategory.name)}/${encodeURIComponent(
          grandCategory.name
        )}`}
      >
        <a>
          <span className={styles.bannerSliderGrandCategoryName}>
            {grandCategory.name}
          </span>
        </a>
      </Link>
    </div>
  );
};

const SubCategories = ({
  subCategory,
  category,
}: {
  subCategory: SubCategory;
  category: Category;
}) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className={styles.bannerSliderSubCategoriesDiv}
      onMouseOver={() => setShow(true)}
      onMouseOut={() => setShow(false)}
    >
      <Link href={`/catogries/${subCategory}`}>
        <a>
          <span className={styles.bannerSliderSubCategoryName}>
            {subCategory.name}
          </span>
        </a>
      </Link>
      {show ? (
        <div className={styles.bannerSliderGrandCategoriesDivContainer}>
          {subCategory.subsubCategories.map((grandcategory, i) => {
            return (
              <GrandCategories
                category={category}
                subCategory={subCategory}
                grandCategory={grandcategory}
                key={`grandcategory-${i}`}
              />
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const Categories = ({ category }: { category: Category }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className={styles.bannerSliderCategoriesDiv}
      onMouseOver={() => setShow(true)}
      onMouseOut={() => setShow(false)}
    >
      <Link href="/catogries/clothing">
        <a>
          <span className={styles.bannerSliderCategoryName}>
            {category.name}
          </span>
        </a>
      </Link>
      {show ? (
        <div className={styles.bannerSliderSubCategoriesDivContainer}>
          {category.subCatagories.map((subcategory, i) => {
            return (
              <SubCategories
                category={category}
                subCategory={subcategory}
                key={`subcategory-${i}`}
              />
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
interface Props {
  categories: Category[];
}
const CategoriesHolder: React.FC<Props> = ({ categories }) => {
  return (
    <div className={styles.bannerSliderCategoriesDivContainer}>
      {categories.map((category, i: number) => {
        return (
          <Categories category={category} key={`categories-home-page-${i}`} />
        );
      })}
    </div>
  );
};

export default CategoriesHolder;
