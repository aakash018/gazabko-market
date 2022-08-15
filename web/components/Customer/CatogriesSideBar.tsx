import React, { useRef, useState } from "react";
import CatogriesBtn from "../shared/Customer/CatogriesBtn";
import styles from "../../styles/components/Customer/CatogriesSideBar.module.scss";
import Catogries from "./Catogries";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import Button from "../shared/Button";
import SideBarNav from "../shared/Customer/SideBarNav";

interface Props {
  sidebar: "show" | "hide" | "clickable";
  type: "catogry" | "search" | "catogryPage";
}

const CatogriesSideBar: React.FC<Props> = ({ sidebar, type }) => {
  const [showCat, setShowCat] = useState(sidebar === "show" ? true : false);

  const [priceRangeSlider, setPriceRangeSlider] = useState([0, 100]);
  const [priceRangeSliderCat, setPriceRangeSliderCat] = useState([0, 100]);

  const handleShowCat = () => {
    setShowCat((prev) => !prev);
  };

  return (
    <div className={styles.ctg}>
      {type === "catogry" && (
        <>
          <CatogriesBtn onClick={handleShowCat} />
          <div
            className={showCat ? `${styles.showCat}` : `${styles.hideCat}`}
            style={{ transition: "all 0.3s ease-in" }}
          >
            <Catogries />
          </div>
        </>
      )}

      {type === "search" && (
        <div className={styles.searchSideBar}>
          <section className={styles.catToSearchIn}>
            <SideBarNav
              title="Category to Search In "
              options={["Electronics", "Men's Fassion", "Women's Fassion"]}
            />
          </section>
          <section className={styles.priceRange}>
            <section className={styles.title}>
              <h1>Price Range</h1>
            </section>
            <section className={styles.rangeBar}>
              <Slider
                range={true}
                value={priceRangeSlider}
                onChange={(value: any) => {
                  setPriceRangeSlider(value);
                }}
              />
            </section>
            <div className={styles.values}>
              <section className={styles.val}>
                <span>From</span>
                <input
                  className={styles.rangeUserInput}
                  type="number"
                  value={priceRangeSlider[0]}
                  onChange={(e) => {
                    setPriceRangeSlider((prev) => [
                      parseInt(e.target.value),
                      prev[1],
                    ]);
                  }}
                />
              </section>
              <section className={styles.val}>
                <span>To</span>
                <input
                  className={styles.rangeUserInput}
                  type="number"
                  value={priceRangeSlider[1]}
                  onChange={(e) => {
                    setPriceRangeSlider((prev) => [
                      prev[0],
                      parseInt(e.target.value),
                    ]);
                  }}
                />
              </section>
            </div>
          </section>
          <section className={styles.brand}>
            <section className={styles.title}>
              {" "}
              <h1>Brands</h1>{" "}
            </section>
            <div className={styles.checkBox}>
              <input type="checkbox" />
              <span> brand</span>
            </div>
            <div className={styles.checkBox}>
              <input type="checkbox" />
              <span> brand</span>
            </div>
            <div className={styles.checkBox}>
              <input type="checkbox" />
              <span> brand</span>
            </div>
            <div className={styles.checkBox}>
              <input type="checkbox" />
              <span> brand</span>
            </div>
          </section>

          <Button onClick={() => {}}>Filter </Button>
        </div>
      )}

      {type === "catogryPage" && (
        <div className={styles.catogryPage}>
          <section className={styles.subCatogries}>
            <SideBarNav
              title="Sub-catogries"
              options={[
                "xyz subcat",
                "xyz subcat",
                "xyz subcat",
                "xyz subcat",
                "xyz subcat",
              ]}
            />
          </section>

          <section className={styles.brands}>
            <SideBarNav
              title="Brands"
              options={["xyz ", "xyz ", "xyz", "xyz", "xyz "]}
            />
          </section>
          <section className={styles.priceRange}>
            <section className={styles.title}>
              <h1>Price</h1>
            </section>
            <Slider
              range={true}
              value={priceRangeSliderCat}
              onChange={(value: any) => {
                setPriceRangeSliderCat(value);
              }}
            />
            <div className={styles.values}>
              <section className={styles.val}>
                <span>From</span>
                <input
                  className={styles.rangeUserInput}
                  type="number"
                  value={priceRangeSliderCat[0]}
                  onChange={(e) => {
                    setPriceRangeSlider((prev) => [
                      parseInt(e.target.value),
                      prev[1],
                    ]);
                  }}
                />
              </section>
              <section className={styles.val}>
                <span>To</span>
                <input
                  className={styles.rangeUserInput}
                  type="number"
                  value={priceRangeSliderCat[1]}
                  onChange={(e) => {
                    setPriceRangeSlider((prev) => [
                      prev[0],
                      parseInt(e.target.value),
                    ]);
                  }}
                />
              </section>
            </div>
          </section>
          <Button onClick={() => {}}>Filter </Button>
        </div>
      )}
    </div>
  );
};

export default CatogriesSideBar;
