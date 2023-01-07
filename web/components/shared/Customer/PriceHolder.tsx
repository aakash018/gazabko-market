import React from "react";
import styles from "../../../styles/components/shared/Customer/PriceHolder.module.scss";

interface Props {
  discount: number;
  mp: number;
  fontSize?: number | string;
}

const PriceHolder: React.FC<Props> = ({
  discount,
  mp,
  fontSize = "1.6rem",
}) => {
  let price: number = 0;

  if (discount && discount !== 0) {
    price = mp - discount;
  }

  return (
    <section className={styles.price} style={{ fontSize: fontSize }}>
      <div
        className={`${styles.original} ${
          discount && discount !== 0 ? styles.discounted : ""
        }`}
      >
        Rs. {mp}
      </div>
      {discount !== 0 && price !== 0 && (
        <span className={styles.discountprice}>Rs. {price}</span>
      )}
    </section>
  );
};

export default PriceHolder;
