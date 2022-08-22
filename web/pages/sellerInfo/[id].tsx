import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";
import Layout from "../../components/Customer/Layout";
import ShowCase from "../../components/Customer/ShowCase";
import Button from "../../components/shared/Button";

import styles from "../../styles/components/Customer/pages/SellerInfoPge.module.scss";

const SellerInfoPage = () => {
  return (
    <Layout sidebar="show">
      <div className={styles.sellerInfoPage}>
        <div className={styles.sellerDataContainer}>
          <section className={styles.sellerData}>
            <section className={styles.sellerLogoContainer}>
              <section className={styles.sellerLogo}>
                <Image
                  src="/images/brand.png"
                  objectFit="cover"
                  width={100}
                  height={100}
                />
              </section>
            </section>
            <section className={styles.rating}>
              <FaStar size={35} />
              <span className={styles.text}>4.7</span>
            </section>
            <section className={styles.sellerInfoFields}>
              <div>
                <section className={styles.name}>Logotext Superstore</section>
                <section className={styles.address}>
                  Southfield, Michigan, United States
                </section>
                <section className={styles.email}>logotext98@gmail.com</section>
              </div>
              <div className={styles.productDetails}>
                <section className={styles.totalProduct}>
                  <section className={styles.title}>Total Products</section>
                  <section className={styles.number}>43</section>
                </section>
                <section className={styles.totalProduct}>
                  <section className={styles.title}>Total Items Sold</section>
                  <section className={styles.number}>13</section>
                </section>
              </div>
            </section>
            <div className="line" style={{ marginTop: 30 }}></div>
          </section>
        </div>

        <section className={styles.products}>
          <ShowCase title="Offered Deals" showTitle={true} noOfProducts={5} />
          <ShowCase title="Popular Items" showTitle={true} noOfProducts={5} />
          <ShowCase title="All Items" showTitle={true} noOfProducts={15} />
        </section>
        <div style={{ alignSelf: "center", marginTop: "20px" }}>
          <Button color="error" look="outlined">
            Load More
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SellerInfoPage;
