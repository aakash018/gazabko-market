import React from "react";
import Layout from "../../components/Customer/Layout";
import Button from "../../components/shared/Button";
import IntputField from "../../components/shared/Input";

import styles from "../../styles/components/Customer/pages/SellerSignup.module.scss";

const SellerSignup = () => {
  return (
    <Layout>
      <div className={styles.sellerLogin}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.main}>Welcome,</div>
            <div className={styles.sub}>New Vendor Registration</div>
          </div>
          <div className={styles.inputData}>
            <div>
              <IntputField label="Username" />
              <IntputField label="Store's Name" />
              <IntputField label="Address" />
              <IntputField label="Contact Person" />
              <IntputField label="Phone No." />
            </div>
            <div>
              <IntputField label="Email (Optional)" />
              <IntputField label="Pan No. (Optional)" />
              <IntputField label="Password" />
              <IntputField label="Confirm Password" />
            </div>
          </div>
          <div className={styles.actBtn}>
            <Button>Send For Verification</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SellerSignup;
