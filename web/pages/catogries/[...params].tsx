import { useRouter } from "next/router";
import Slider from "rc-slider";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Customer/Layout";
import ShowCase from "../../components/Customer/ShowCase";
import Button from "../../components/shared/Button";
import SideBarNav from "../../components/shared/Customer/SideBarNav";
import styles from "../../styles/components/Customer/pages/CatogriesPage.module.scss";

import Image from "next/image";
import IntputField from "../../components/shared/Input";
import axios from "axios";
import { ProtuctType } from "../../@types/global";
import { useAlert } from "../_app";

const CategoriesPage = () => {
  const router = useRouter();
  const { params } = router.query;

  const [priceRangeSliderCat, setPriceRangeSliderCat] = useState([0, 100]);
  const [priceRangeSlider, setPriceRangeSlider] = useState([0, 100]);

  const [products, setProducts] = useState<ProtuctType[]>([]);
  const [loading, setLoading] = useState(false);
  const { setAlert } = useAlert();

  useEffect(() => {
    let ignore = false;
    if (!ignore && params && params.length !== 0) {
      (async () => {
        try {
          setLoading(true);
          const res = await axios.get<
            RespondType & { products?: ProtuctType[] }
          >(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/category/getSpecificProduct`,
            {
              params: {
                category: params[0],
                subCategory: params[1],
                subsubCategory: params[2],
              },
            }
          );
          setLoading(false);
          if (res.data.status === "ok" && res.data.products) {
            setProducts(res.data.products);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        } catch {
          setLoading(false);
          setAlert({
            type: "error",
            message: "failed to connect to server",
          });
        }
      })();
    }

    return () => {
      ignore = true;
    };
  }, [params]);

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
                  <input type={"checkbox"} />
                  <span>Brand Name</span>
                </li>
                <li>
                  <input type={"checkbox"} />
                  <span>Brand Name</span>
                </li>
                <li>
                  <input type={"checkbox"} />
                  <span>Brand Name</span>
                </li>
                <li>
                  <input type={"checkbox"} />
                  <span>Brand Name</span>
                </li>
                <li>
                  <input type={"checkbox"} />
                  <span>Brand Name</span>
                </li>
                <li>
                  <input type={"checkbox"} />
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
        <div className={styles.catogriesPage} style={{ width: "100%" }}>
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
            {!loading && products.length !== 0 && (
              <ShowCase
                title="All Products"
                showTitle={true}
                products={products}
              />
            )}
          </div>
          {loading && <h2>Loading...</h2>}
          {!loading && products.length === 0 && <h2>No products found</h2>}
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesPage;
