import React, { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

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
  "Motors, Tools & DIY"
];


const SearchBarCategoriesSelector = () => {
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState(new Array(categoriesList.length).fill(false));

  const handleChecked = (position: number) => {
    const newCheckedCategoriesList = categories.map((item, index) =>
      index === position ? !item : item
    );
    setCategories(newCheckedCategoriesList);
  };

  return (
    <div style={{ position: "relative", height: "30px" }}>
      <div style={{ height: "30px", border: "1px solid #ddd", padding: "2px 5px", cursor: "pointer" }} onClick={() => setShow(show => !show)}>
        <span style={{ fontSize: "13px", fontWeight: "500" }}>All Categories <span style={{ fontSize: "13px", fontWeight: "500" }}>{show ? <AiOutlineUp /> : <AiOutlineDown />}</span></span>
      </div>
      {show ?
        <div style={{ width: "200px", padding: "5px", lineHeight: "2.3em", backgroundColor: "#eee", border: "1px solid #ddd", boxShadow: "1px 1px 1px #757575", position: "absolute", top: "calc(100% + 4px)" }}>
          {categories.map((value, index) => {
            return (
              <div>
                <input type="checkbox" value={value} onChange={() => handleChecked(index)} /> &nbsp;
                <label style={{ fontSize: "13px" }} htmlFor={categoriesList[index]}>{categoriesList[index]}</label>
              </div>
            );
          })}
        </div>
        : <></>}
    </div>
  );
};

export default SearchBarCategoriesSelector;
