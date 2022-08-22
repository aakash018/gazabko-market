import React from "react";
import { BsCheck2 } from "react-icons/bs";
import { GiTick } from "react-icons/gi";
import styles from "../../../styles/components/shared/Customer/OrderTracker.module.scss";
const OrderTracker: React.FC = () => {
  return (
    <div className={styles.orderTracker}>
      <div className={styles.midLine}></div>
      <div className={styles.tags}>
        <div className={styles.icon}>
          <BsCheck2 />
        </div>
        <div className={styles.text}>Pending</div>
      </div>
      <div className={styles.tags}>
        <div className={styles.icon}>
          <BsCheck2 />
        </div>
        <div className={styles.text}>Shipping</div>
      </div>
      <div className={styles.tags}>
        <div className={styles.icon}>
          <BsCheck2 />
        </div>
        <div className={styles.text}>Arriving</div>
      </div>
      <div className={styles.tags}>
        <div className={styles.icon}>
          <BsCheck2 />
        </div>
        <div className={styles.text}>Success</div>
      </div>
    </div>
  );
};

export default OrderTracker;
