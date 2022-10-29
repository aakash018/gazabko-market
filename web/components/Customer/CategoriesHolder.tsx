import { useState } from "react";
import Link from "next/link";
import styles from "../../styles/components/Customer/CategoriesHolder.module.scss";

interface GrandCategoriesProps {
  name: string;
  url: string;
}

interface SubCategoriesProps {
  name: string;
  url: string;
  grandCategories: GrandCategoriesProps[];
}

interface CategoriesProps {
  name: string;
  subCategories: SubCategoriesProps[];
}

const GrandCategories = ({
  grandCategory,
}: {
  grandCategory: GrandCategoriesProps;
}) => {
  return (
    <div className={styles.bannerSliderGrandCategoriesDiv}>
      <Link href={`/catogries/${grandCategory.url}`}>
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
}: {
  subCategory: SubCategoriesProps;
}) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className={styles.bannerSliderSubCategoriesDiv}
      onMouseOver={() => setShow(true)}
      onMouseOut={() => setShow(false)}
    >
      <Link href={`/catogries/${subCategory.url}`}>
        <a>
          <span className={styles.bannerSliderSubCategoryName}>
            {subCategory.name}
          </span>
        </a>
      </Link>
      {show ? (
        <div className={styles.bannerSliderGrandCategoriesDivContainer}>
          {subCategory.grandCategories.map((grandcategory, i) => {
            return (
              <GrandCategories
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

const Categories = ({ category }: { category: CategoriesProps }) => {
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
          {category.subCategories.map((subcategory, i) => {
            return (
              <SubCategories
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

const categories = [
  {
    name: "Women's Fashion",
    subCategories: [
      {
        name: "Clothing",
        url: "clothing",
        grandCategories: [{ name: "Jeans", url: "jeans" }],
      },
    ],
  },
  {
    name: "Health & Beauty",
    subCategories: [
      {
        name: "Clothing",
        url: "clothing",
        grandCategories: [{ name: "Jeans", url: "jeans" }],
      },
    ],
  },
  {
    name: "Men's Fashion",
    subCategories: [
      {
        name: "Clothing",
        url: "clothing",
        grandCategories: [{ name: "Jeans", url: "jeans" }],
      },
    ],
  },
  {
    name: "Watches, Bags, Jewellery",
    subCategories: [
      {
        name: "Clothing",
        url: "clothing",
        grandCategories: [{ name: "Jeans", url: "jeans" }],
      },
    ],
  },
  {
    name: "Electronic Devices",
    subCategories: [
      {
        name: "Clothing",
        url: "clothing",
        grandCategories: [{ name: "Jeans", url: "jeans" }],
      },
    ],
  },
  {
    name: "TV & Home Appliances",
    subCategories: [
      {
        name: "Clothing",
        url: "clothing",
        grandCategories: [{ name: "Jeans", url: "jeans" }],
      },
    ],
  },
  {
    name: "Electronic Accessories",
    subCategories: [
      {
        name: "Clothing",
        url: "clothing",
        grandCategories: [{ name: "Jeans", url: "jeans" }],
      },
    ],
  },
  {
    name: "Groceries & Pets",
    subCategories: [
      {
        name: "Clothing",
        url: "clothing",
        grandCategories: [{ name: "Jeans", url: "jeans" }],
      },
    ],
  },
  {
    name: "Babies & Toys",
    subCategories: [
      {
        name: "Clothing",
        url: "clothing",
        grandCategories: [{ name: "Jeans", url: "jeans" }],
      },
    ],
  },
  {
    name: "Home & Lifestyle",
    subCategories: [
      {
        name: "Clothing",
        url: "clothing",
        grandCategories: [{ name: "Jeans", url: "jeans" }],
      },
    ],
  },
  {
    name: "Sports & Outdoor",
    subCategories: [
      {
        name: "Clothing",
        url: "clothing",
        grandCategories: [{ name: "Jeans", url: "jeans" }],
      },
    ],
  },
  {
    name: "Motors, Tools & DIY",
    subCategories: [
      {
        name: "Clothing",
        url: "clothing",
        grandCategories: [{ name: "Jeans", url: "jeans" }],
      },
    ],
  },
];

const CategoriesHolder = () => {
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
