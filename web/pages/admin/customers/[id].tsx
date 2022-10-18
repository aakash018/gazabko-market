import Image from "next/image";
import React from "react";
import AdminLayout from "../../../components/Admin/AdminNav";
import Button from "../../../components/shared/Button";

import styles from "../../../styles/components/Admin/pages/CustomerInfoPage.module.scss";

const CustomerInfoPage = () => {
  return (
    <AdminLayout>
      <div className={styles.customerInfoWrapper}>
        <div className={styles.customerInfo}>
          <div className={styles.info}>
            <div className={styles.title}>Customer’s Profile</div>
            <div className={styles.infoGroup}>
              <div className={styles.infoHolder}>
                <div className={styles.infoTitle}>First Name: </div>
                <div className={styles.infoContent}>Laxmi</div>
              </div>{" "}
              <div className={styles.infoHolder}>
                <div className={styles.infoTitle}>Last Name: </div>
                <div className={styles.infoContent}>Bhattarai</div>
              </div>
              <div className={styles.infoHolder}>
                <div className={styles.infoTitle}>Email: </div>
                <div className={styles.infoContent}>random@gmail.com</div>
              </div>
              <div className={styles.infoHolder}>
                <div className={styles.infoTitle}>Phone: </div>
                <div className={styles.infoContent}>9862364785</div>
              </div>
              <div className={styles.infoHolder}>
                <div className={styles.infoTitle}>Status: </div>
                <div className={styles.infoContent}>Verified</div>
              </div>
            </div>
            <div className={styles.infoGroup}>
              <div className={styles.infoHolder}>
                <div className={styles.infoTitle}>Delivery Address: </div>
                <div className={styles.infoContent}>xyz 123</div>
              </div>
              <div className={styles.infoHolder}>
                <div className={styles.infoTitle}>Nearest Landmark: </div>
                <div className={styles.infoContent}>xyz 123</div>
              </div>
            </div>
            <div className={styles.infoGroup}>
              <div className={styles.infoHolder}>
                <div className={styles.infoTitle}>Total Items Bought: </div>
                <div className={styles.infoContent}>21</div>
              </div>
              <div className={styles.infoHolder}>
                <div className={styles.infoTitle}>Total money spent: </div>
                <div className={styles.infoContent}>35,587</div>
              </div>
            </div>
            <div className={styles.infoGroup}>
              <div className={styles.infoHolder}>
                <div className={styles.infoTitle}>Joined Date: </div>
                <div className={styles.infoContent}>27 June 2022</div>
              </div>
              <div className={styles.infoHolder}>
                <div className={styles.infoTitle}>Last Online: </div>
                <div className={styles.infoContent}>27 June 2022</div>
              </div>
              <div className={styles.infoHolder}>
                <div className={styles.infoTitle}>Last Purches: </div>
                <div className={styles.infoContent}>27 June 2022</div>
              </div>
            </div>
            <div className={styles.infoGroup}>
              <div className={styles.infoHolder}>
                <div className={styles.infoTitle}>Total Reviews Written: </div>
                <div className={styles.infoContent}>2</div>
              </div>
              <div className={styles.infoHolder}>
                <div className={styles.infoTitle}>Total Reports Written: </div>
                <div className={styles.infoContent}>2</div>
              </div>
            </div>
            <div className={styles.actBtn}>
              <Button>Verify</Button>
              <Button color="error">Ban User</Button>
            </div>
          </div>
          <div className={styles.avatar}>
            <Image src="/images/avatar.jpg" width={250} height={250} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CustomerInfoPage;
