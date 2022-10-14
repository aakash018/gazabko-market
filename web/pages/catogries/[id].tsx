import { useRouter } from "next/router";
import Slider from "rc-slider";
import React, { useState } from "react";
import Layout from "../../components/Customer/Layout";
import ShowCase from "../../components/Customer/ShowCase";
import Button from "../../components/shared/Button";
import SideBarNav from "../../components/shared/Customer/SideBarNav";
import styles from "../../styles/components/Customer/pages/CatogriesPage.module.scss";

const CategoriesPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [priceRangeSliderCat, setPriceRangeSliderCat] = useState([0, 100]);
  const [priceRangeSlider, setPriceRangeSlider] = useState([0, 100]);

  return (
    <Layout sidebar="hide" type="catogryPage">
      <div className={styles.catPageWrapper}>
        <div style={{ position: "sticky" }}>
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
        </div>
        <div className={styles.catogriesPage}>
          <div className={styles.topProduct}>
            <ShowCase showTitle={true} title="Top Brands" type="brand" />
            <ShowCase title="All Products" showTitle={true} noOfProducts={20} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesPage;
