import { useRouter } from "next/router";
import Slider from "rc-slider";
import React, { useState } from "react";
import Layout from "../../components/Customer/Layout";
import ShowCase from "../../components/Customer/ShowCase";
import Button from "../../components/shared/Button";
import SideBarNav from "../../components/shared/Customer/SideBarNav";

import styles from "../../styles/components/Customer/pages/SearchResult.module.scss";

const SearchResult: React.FC = () => {
  const router = useRouter();
  const { parameter } = router.query;

  const [priceRangeSlider, setPriceRangeSlider] = useState([0, 100]);

  return (
    <Layout type="search">
      <div className={styles.searchPageContainer}>
        <div className={styles.sideBar}>
          <div className={styles.searchSideBar} style={{ paddingTop: "30px" }}>
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
        </div>
        <div className={styles.searchResults}>
          <div className={styles.title}>Search results for "{parameter}"</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              justifyContent: "flex-end",
              margin: "20px 0 0 0",
            }}
          >
            <span
              style={{
                fontSize: "1.3rem",
              }}
            >
              Sort By:
            </span>
            <select>
              <option value="Best Fit" selected>
                Best Fit
              </option>
              <option value="Price High To Low">Price High To Low</option>
              <option value="Price Low To High">Price Low To High</option>
            </select>
          </div>
          <ShowCase includeTimer={false} noOfProducts={16} />
        </div>
      </div>
    </Layout>
  );
};

export default SearchResult;
