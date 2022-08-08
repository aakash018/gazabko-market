import React, { useRef, useState } from "react";
import CatogriesBtn from "../shared/Customer/CatogriesBtn";
import styles from "../../styles/components/Customer/CatogriesSideBar.module.scss";
import Catogries from "./Catogries";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface Props {
  sidebar: "show" | "hide" | "clickable";
  type: "catogry" | "search" | "catogryPage";
}

const CatogriesSideBar: React.FC<Props> = ({ sidebar, type }) => {
  const [showCat, setShowCat] = useState(sidebar === "show" ? true : false);

  const [priceRangeSlider, setPriceRangeSlider] = useState([0, 100]);

  const handleShowCat = () => {
    setShowCat((prev) => !prev);
  };

  return (
    <div className={styles.ctg}>
      {type === "catogry" && (
        <>
          <CatogriesBtn onClick={handleShowCat} />
          <div className={showCat ? `${styles.showCat}` : `${styles.hideCat}`}>
            <Catogries />
          </div>
        </>
      )}

      {type === "search" && (
        <div className={styles.searchSideBar}>
          <section className={styles.catToSearchIn}>
            <section className={styles.title}>Category to Search In </section>
            <ul>
              <li>Electronics</li>
              <li>Womens Fashion</li>
              <li>Men's Fashion</li>
            </ul>
          </section>
          <section className={styles.priceRange}>
            <section className={styles.title}>Price Range</section>
            <section className={styles.rangeBar}>
              <Slider
                range={true}
                value={priceRangeSlider}
                onChange={(value: any) => {
                  setPriceRangeSlider(value);
                }}
              />
            </section>
            <section className={styles.val}>{priceRangeSlider[0]}</section>
            <section className={styles.val}>{priceRangeSlider[1]}</section>
          </section>
          <section className={styles.brand}>
            <section className={styles.title}> Brands </section>
            <div className={styles.checkBox}>
              <input type="checkbox" /> brand
            </div>
            <div className={styles.checkBox}>
              <input type="checkbox" /> brand
            </div>
            <div className={styles.checkBox}>
              <input type="checkbox" /> brand
            </div>
            <div className={styles.checkBox}>
              <input type="checkbox" /> brand
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default CatogriesSideBar;
