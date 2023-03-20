import Link from "next/link";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import Slider from "rc-slider";
import React, { useEffect, useRef, useState } from "react";
import Breadcrumb from "../../components/Customer/Breadcrumb";
import Layout from "../../components/Customer/Layout";
import ShowCase from "../../components/Customer/ShowCase";
import Button from "../../components/shared/Button";
import SideBarNav from "../../components/shared/Customer/SideBarNav";

import styles from "../../styles/components/Customer/pages/SearchResult.module.scss";
import { ProtuctType } from "../../@types/global";
import axios from "axios";
import { useAlert } from "../_app";

const BrandResult: React.FC = () => {
  const router = useRouter();
  const { brand, name } = router.query;

  const [priceRangeSlider, setPriceRangeSlider] = useState([0, 100]);
  const [topProducts, setTopProducts] = useState<ProtuctType[]>([]);
  const [allProducts, setAllProducts] = useState<ProtuctType[]>([]);
  const [loading, setLoading] = useState(false);

  let ignore = useRef(false);

  const { setAlert } = useAlert();

  useEffect(() => {
    if (!ignore.current) {
      (async () => {
        try {
          setLoading(true);
          const res = await axios.get<
            RespondType & { products: ProtuctType[] }
          >(`${process.env.NEXT_PUBLIC_SERVER_END_POINT}/brand/mostSold`, {
            params: {
              brand: name,
            },
          });

          if (res.data.status === "ok") {
            setTopProducts(res.data.products);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
          const resAllProducts = await axios.get<
            RespondType & { products: ProtuctType[] }
          >(`${process.env.NEXT_PUBLIC_SERVER_END_POINT}/brand`, {
            params: {
              brand: name,
            },
          });
          if (resAllProducts.data.status === "ok") {
            setAllProducts(resAllProducts.data.products);
            setLoading(false);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        } catch (error) {
          console.log(error);
          setLoading(false);
          setAlert({
            type: "error",
            message: "failed to connect to servers",
          });
        }
      })();
    }

    return () => {
      ignore.current = true;
    };
  }, []);

  return (
    <Layout type="search">
      {loading === true && <h2>Loading...</h2>}
      {
        <>
          <div
            style={{
              borderBottom: "1px solid #bbb",
              marginLeft: "30px",
              marginTop: "-30px",
            }}
          >
            <Breadcrumb
              grandCategory={{ name: name as string, url: `/brand/${name}` }}
            />
          </div>
          <h3 style={{ marginTop: 20, marginLeft: 30 }}>Top Sold Products</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0px 30px 30px",
            }}
          >
            <div style={{ display: "flex", boxShadow: "1px 1px 3px #bbb" }}>
              {topProducts.map((product, i) => (
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    padding: "15px 25px",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                    maxWidth: 150,
                    borderRight: "1px solid #bbb",

                    cursor: "pointer",
                  }}
                  key={i}
                  onClick={() => {
                    Router.push(`/products/${product.id}`);
                  }}
                >
                  <Image
                    src="/images/sneakers.jpg"
                    width={100}
                    height={100}
                    alt="Sneakers"
                  />
                  <span
                    style={{
                      fontSize: "14px",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.searchPageContainer}>
            <div className={styles.sideBar}>
              {/* <div className={styles.searchSideBar}>
                <section className={styles.catToSearchIn}>
                  <SideBarNav
                    title="Category to Search In "
                    options={[
                      "Electronics",
                      "Men's Fassion",
                      "Women's Fassion",
                    ]}
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
                    <input type="checkbox" checked />
                    <span> Goldstar</span>
                  </div>
                </section>

                <Button onClick={() => {}}>Filter </Button>
              </div> */}
            </div>
            <div className={styles.searchResults}>
              <div className={styles.title}>{name}</div>
              <div
                style={{ marginTop: "10px", fontSize: "13px", color: "#888" }}
              ></div>
              <ShowCase includeTimer={false} products={allProducts} />
            </div>
          </div>
        </>
      }
    </Layout>
  );
};

export default BrandResult;
