import React from "react";
import { BiPackage } from "react-icons/bi";

import styles from "../../styles/components/Seller/SellerDashTabs.module.scss";

interface Props {
  icon: React.ReactNode;
  number: string;
  text: string;
}

const SellerDashTabs: React.FC<Props> = ({ icon, number, text }) => {
  return (
    <div className={styles.sellerDashTabs}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.info}>
        <div className={styles.number}>{number}</div>
        <div className={styles.text}>{text}</div>
      </div>
    </div>
  );
};

export default SellerDashTabs;
