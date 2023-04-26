import React from "react";
import styles from "../../styles/components/shared/ProductReport.module.scss";
import Image from "next/image";
const ProductReport = () => {
  return (
    <div className={styles.productReportContainer}>
      <div className={styles.product}>
        <div className={styles.image}>{/* <Image src={}  /> */}</div>
        <div className={styles.name}></div>
        <div>View Product</div>
      </div>
      <div className={styles.report}></div>
    </div>
  );
};

export default ProductReport;
