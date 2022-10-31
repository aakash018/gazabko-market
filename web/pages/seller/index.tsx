import Router from "next/router";
import React from "react";
import Layout from "../../components/Customer/Layout";
import Button from "../../components/shared/Button";
import IntputField from "../../components/shared/Input";

import styles from "../../styles/components/Customer/pages/SellerLogin.module.scss";

const SellerLogin = () => {
  return (
    <Layout>
      <div className={styles.sellerLogin}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.main}>Welcome,</div>
            <div className={styles.sub}>
              Sell On GazabzoMarket, BOOM Your Buissness
            </div>
          </div>
          <IntputField label="Username" />
          <IntputField label="Password" />
          <div className={styles.actBtn}>
            <Button onClick={() => Router.push("/seller/dash")}>Login</Button>
            <Button
              color="success"
              onClick={() => Router.push("/seller/signup")}
            >
              Need an Account? SIGNUP
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SellerLogin;
