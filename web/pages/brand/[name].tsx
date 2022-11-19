import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Slider from "rc-slider";
import React, { useState } from "react";
import Breadcrumb from "../../components/Customer/Breadcrumb";
import Layout from "../../components/Customer/Layout";
import ShowCase from "../../components/Customer/ShowCase";
import Button from "../../components/shared/Button";
import SideBarNav from "../../components/shared/Customer/SideBarNav";

import styles from "../../styles/components/Customer/pages/SearchResult.module.scss";

const BrandResult: React.FC = () => {
  const router = useRouter();
  const { parameter } = router.query;

  const [priceRangeSlider, setPriceRangeSlider] = useState([0, 100]);

  return (
    <Layout sidebar="hide" type="search">
      <div style={{ borderBottom: "1px solid #bbb", marginLeft: "30px", marginTop: "-30px" }}>
        <Breadcrumb grandCategory={{ name: "Goldstar", url: "/brand/goldstar" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "center", margin: "20px 0px 30px 30px" }}>
        <div style={{ display: "flex", boxShadow: "1px 1px 3px #bbb" }}>
          <div style={{ display: "flex", gap: "5px", padding: "15px 25px", flexDirection: "column", justifyContent: "center", textAlign: "center", borderRight: "1px solid #bbb" }}>
            <Image src="/images/sneakers.jpg" width={100} height={100} alt="Sneakers" />
            <span style={{ fontSize: "14px" }}>Sneakers</span>
          </div>
          <div style={{ display: "flex", gap: "5px", padding: "15px 25px", flexDirection: "column", justifyContent: "center", textAlign: "center", borderRight: "1px solid #bbb" }}>
            <Image src="/images/running-shoes.jpg" width={100} height={100} alt="Running shoes" />
            <span style={{ fontSize: "14px" }}>Running shoes</span>
          </div>
          <div style={{ display: "flex", gap: "5px", padding: "15px 25px", flexDirection: "column", justifyContent: "center", textAlign: "center", borderRight: "1px solid #bbb" }}>
            <Image src="/images/sneakers-1.png" width={100} height={100} alt="Sneakers" />
            <span style={{ fontSize: "14px" }}>Sneakers</span>
          </div>
          <div style={{ display: "flex", gap: "5px", padding: "15px 25px", flexDirection: "column", justifyContent: "center", textAlign: "center", borderRight: "1px solid #bbb" }}>
            <Image src="/images/running-shoes-1.jpg" width={100} height={100} alt="Running shoes" />
            <span style={{ fontSize: "14px" }}>Running shoes</span>
          </div>
          <div style={{ display: "flex", gap: "5px", padding: "15px 25px", flexDirection: "column", justifyContent: "center", textAlign: "center", borderRight: "1px solid #bbb" }}>
            <Image src="/images/shoes.jpg" width={100} height={100} alt="Classy shoes" />
            <span style={{ fontSize: "14px" }}>Classy shoes</span>
          </div>
           <div style={{ display: "flex", gap: "5px", padding: "15px 25px", flexDirection: "column", justifyContent: "center", textAlign: "center", borderRight: "1px solid #bbb" }}>
            <Image src="/images/shoes3.jpg" width={100} height={100} alt="Shoes" />
            <span style={{ fontSize: "14px" }}>Shoes</span>
          </div>
           <div style={{ display: "flex", gap: "5px", padding: "15px 25px", flexDirection: "column", justifyContent: "center", textAlign: "center", borderRight: "1px solid #bbb" }}>
            <Image src="/images/sports.jpg" width={100} height={100} alt="Sports shoes" />
            <span style={{ fontSize: "14px" }}>Sports shoes</span>
          </div>
          <div style={{ display: "flex", gap: "5px", padding: "15px 25px", flexDirection: "column", justifyContent: "center", textAlign: "center", borderRight: "1px solid #bbb" }}>
            <Image src="/images/sports-sneakers.jpg" width={100} height={100} alt="Sports Sneakers" />
            <span style={{ fontSize: "14px" }}>Sports Sneakers</span>
          </div>
          <div style={{ display: "flex", gap: "5px", padding: "15px 25px", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
            <Image src="/images/sneakers.jpg" width={100} height={100} alt="Sneakers" />
            <span style={{ fontSize: "14px" }}>Sneakers</span>
          </div>
        </div>
      </div>
      <div className={styles.searchPageContainer}>
        <div className={styles.sideBar}>
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
                <input type="checkbox" checked />
                <span> Goldstar</span>
              </div>
            </section>

            <Button onClick={() => { }}>Filter </Button>
          </div>
        </div>
        <div className={styles.searchResults}>
          <div className={styles.title}>Goldstar Shoes Store</div>
          <div style={{ marginTop: "10px", fontSize: "13px", color: "#888" }}>1596 items found in <Link href="/brand/goldstar"><span style={{ color: "#1a9cb7" }}>Goldstar</span></Link></div>
          <ShowCase includeTimer={false} noOfProducts={16} />
        </div>
      </div>
    </Layout>
  );
};

export default BrandResult;
