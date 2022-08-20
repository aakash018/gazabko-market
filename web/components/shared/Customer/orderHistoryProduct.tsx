import Image from "next/image";
import React from "react";
import styles from "../../../styles/components/shared/Customer/orderHistoryProducts.module.scss";
const OrderHistoryProduct: React.FC = () => {
  return (
    <div className={styles.orderHistoryProduct}>
      <section className={styles.productImg}>
        <Image
          src={"/images/shoes.jpg"}
          alt="product"
          layout="fill"
          objectFit="contain"
        />
      </section>
      <section className={styles.info}>
        <section className={styles.title}>
          <div className={styles.orderNumber}>Order #204188020499183</div>
          <div className={styles.orderTime}>Placed on 01 Aug 2022 09:31:44</div>
        </section>
        <div className={styles.name}>Men Breathable Light Sports Shoes</div>

        <div className={styles.status}>Delivered</div>
      </section>
      <div className={styles.date}>Delivered on 13 Jan 2022</div>
    </div>
  );
};

export default OrderHistoryProduct;
