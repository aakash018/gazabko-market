import { useRouter } from "next/router";
import Slider from "rc-slider";
import React, { useState } from "react";
import Layout from "../../components/Customer/Layout";
import ShowCase from "../../components/Customer/ShowCase";
import Button from "../../components/shared/Button";
import SideBarNav from "../../components/shared/Customer/SideBarNav";
import styles from "../../styles/components/Customer/pages/CatogriesPage.module.scss";

import Image from "next/image";
import IntputField from "../../components/shared/Input";

const CategoriesPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [priceRangeSliderCat, setPriceRangeSliderCat] = useState([0, 100]);
  const [priceRangeSlider, setPriceRangeSlider] = useState([0, 100]);

  return (
    <Layout type="catogryPage">
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
              <div className={styles.title}>Brands</div>
              <ul>
                <li>
                  <IntputField type={"checkbox"} />
                  <span>Brand Name</span>
                </li>
                <li>
                  <IntputField type={"checkbox"} />
                  <span>Brand Name</span>
                </li>
                <li>
                  <IntputField type={"checkbox"} />
                  <span>Brand Name</span>
                </li>
                <li>
                  <IntputField type={"checkbox"} />
                  <span>Brand Name</span>
                </li>
                <li>
                  <IntputField type={"checkbox"} />
                  <span>Brand Name</span>
                </li>
                <li>
                  <IntputField type={"checkbox"} />
                  <span>Brand Name</span>
                </li>
              </ul>
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
          <div className={styles.catBanner}>
            <div className={styles.catBanner}>
              <Image
                src={"/images/catogries/bar.jpg"}
                layout="fill"
                objectFit="cover"
                objectPosition={"top"}
              />
              <div className={styles.label}>
                <div className={styles.title}>Gazabko Bar</div>
                <div className={styles.topBrands}>
                  <Image
                    src={"/images/brand.png"}
                    width={70}
                    height={70}
                    objectFit="cover"
                  />
                  <Image
                    src={"/images/placeHolders/placeHolder.jpeg"}
                    width={70}
                    height={70}
                    objectFit="cover"
                  />
                  <Image
                    src={"/images/brand.png"}
                    width={70}
                    height={70}
                    objectFit="cover"
                  />
                  <Image
                    src={"/images/placeHolders/placeHolder.jpeg"}
                    width={70}
                    height={70}
                    objectFit="cover"
                  />
                  <Image
                    src={"/images/brand.png"}
                    width={70}
                    height={70}
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.products}>
            <div className={styles.actions}>
              <div className={styles.sort}>
                <span>Sort By:</span>
                <select>
                  <option value="Best Match" selected={true}>
                    Best Match
                  </option>
                  <option value="Price High To Low">Price High To Low</option>
                  <option value="Price Low To High">Price Low To High</option>
                </select>
              </div>
            </div>
            <ShowCase title="All Products" showTitle={true} noOfProducts={20} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesPage;
