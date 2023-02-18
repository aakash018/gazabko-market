import { Category } from "../../../@types/global";

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
}

const SearchBarCategoriesSelector = ({ height, categories }: Props) => {
  return (
    <div>
      <select
        style={{
          height: height,
          borderBottomLeftRadius: "10px",
          borderTopLeftRadius: "10px",
          border: "none",
          width: "180px",
          textOverflow: "ellipsis",
        }}
      >
        <option value="all">All Categories</option>
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
