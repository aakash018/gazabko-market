import React from "react";
import styles from "../../styles/components/Admin/TopItemsPopup.module.scss";

interface Props {
  title: string;
  items: {
    name: string;
    amount: number;
  }[];
}

const TopItemsPopup: React.FC<Props> = ({ title, items }) => {
  return (
    <div className={styles.topItemsPopup}>
      <div className={styles.title}>{title}</div>
      <div className="line"></div>
      <div className={styles.content}>
        {items.map((item, i) => {
          return (
            <div className={styles.itemHolder}>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.amount}>{item.amount}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopItemsPopup;
