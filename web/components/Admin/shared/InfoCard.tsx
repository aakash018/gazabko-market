import React from "react";
import styles from "../../../styles/components/shared/Admin/InfoCards.module.scss";
import Button from "../../shared/Button";

interface Props {
  title: string;
  amount: number;
  children: React.ReactNode;
  bgColor: string;
}

const InfoCard: React.FC<Props> = ({ amount, title, children, bgColor }) => {
  return (
    <div
      className={styles.infoCard}
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div className={styles.topPart}>
        <div className={styles.icon}>{children}</div>
        <div className={styles.amount}>{amount}</div>
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.actBtn}>
        <Button color="white">View All</Button>
      </div>
    </div>
  );
};

export default InfoCard;
