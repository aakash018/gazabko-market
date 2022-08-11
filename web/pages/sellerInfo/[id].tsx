import React from "react";
import Layout from "../../components/Customer/Layout";

import styles from "../../styles/components/Customer/pages/SellerInfoPge.module.scss";

const SellerInfoPage = () => {
  return (
    <Layout sidebar="show">
      <div className={styles.sellerInfoPage}>
        <section className={styles.sellerData}>
          <section className={styles.sellerLogo}></section>
        </section>
      </div>
    </Layout>
  );
};

export default SellerInfoPage;
