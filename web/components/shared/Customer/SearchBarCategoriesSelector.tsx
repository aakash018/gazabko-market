import { Category } from "../../../@types/global";
import styles from "../../../styles/components/shared/Customer/CatSelector.module.scss";

const categoriesList = [
  "Women's Fashion",
  "Health & Beauty",
  "Men's Fashion",
  "Watches, Bags, Jewellery",
  "Electronic Devices",
  "TV & Home Appliances",
  "Electronic Accessories",
  "Groceries & Pets",
  "Babies & Toys",
  "Home & Lifestyle",
  "Sports & Outdoor",
  "Motors, Tools & DIY",
];

interface Props {
  height: string;
  categories: Category[];
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBarCategoriesSelector = ({
  height,
  categories,
  setCategory,
}: Props) => {
  return (
    <div>
      <select
        style={{
          height: height,
          borderBottomLeftRadius: "10px",
          borderTopLeftRadius: "10px",
          border: "none",
          // width: "180px",
          textOverflow: "ellipsis",
        }}
        className={styles.searchBarCat}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        <option value="All Categories" selected>
          All Categories
        </option>
        {categories.map((category, index) => {
          return (
            <option
              key={`searchbar-category-option-${index}`}
              value={category.name}
            >
              {category.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SearchBarCategoriesSelector;
