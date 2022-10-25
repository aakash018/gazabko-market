import React from "react";
import AdminLayout from "../../../../components/Admin/AdminNav";

import styles from "../../../../styles/components/Admin/pages/GiftCoupenDetails.module.scss";

const CoupenDetails = () => {
  return (
    <AdminLayout>
      <h1>Coupen Details</h1>
      <div className={styles.coupenDetails}>
        <div className={styles.infoGroup}>
          <div className={styles.infoHolder}>
            <div className={styles.infoTitle}>ID: </div>
            <div className={styles.infoContent}>654321684486565</div>
          </div>
          <div className={styles.infoHolder}>
            <div className={styles.infoTitle}>Code: </div>
            <div className={styles.infoContent}>DS48SDW</div>
          </div>
        </div>
        <div className={styles.infoGroup}>
          <div className={styles.infoHolder}>
            <div className={styles.infoTitle}>Generted Date: </div>
            <div className={styles.infoContent}>27 May 2022</div>
          </div>
          <div className={styles.infoHolder}>
            <div className={styles.infoTitle}>Expiring Date: </div>
            <div className={styles.infoContent}>30 May 2022</div>
          </div>
        </div>
        <div className={styles.infoGroup}>
          <div className={styles.infoHolder}>
            <div className={styles.infoTitle}>Minimum Purches: </div>
            <div className={styles.infoContent}>Rs 2000</div>
          </div>
          <div className={styles.infoHolder}>
            <div className={styles.infoTitle}>Discount Offered: </div>
            <div className={styles.infoContent}>20%</div>
          </div>
          <div className={styles.infoGroup}>
            <div className={styles.infoHolder}>
              <div className={styles.infoTitle}>Categories: </div>
              <div className={styles.infoContent}>
                Men Fassion, Women Faassion
              </div>
            </div>
            <div className={styles.infoHolder}>
              <div className={styles.infoTitle}>Products: </div>
              <div className={styles.infoContent}>N/A</div>
            </div>
            <div className={styles.infoHolder}>
              <div className={styles.infoTitle}>Vendors: </div>
              <div className={styles.infoContent}>N/A</div>
            </div>
            <div className={styles.infoHolder}>
              <div className={styles.infoTitle}>Brands: </div>
              <div className={styles.infoContent}>Samsung, Xiaomi</div>
            </div>
            <div className={styles.infoGroup}>
              <div className={styles.infoHolder}>
                <div className={styles.infoTitle}>Total Times Used: </div>
                <div className={styles.infoContent}>10</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CoupenDetails;
