import Image from "next/image";
import Router from "next/router";
import React from "react";
import { ProtuctType } from "../../../@types/global";
import styles from "../../../styles/components/shared/Customer/orderHistoryProducts.module.scss";

interface Props {
  product: ProtuctType;
  status: "pending" | "processing" | "delivered";
}
const OrderHistoryProduct: React.FC<Props> = ({ product, status }) => {
  return (
    <div
      className={styles.orderHistoryProduct}
      onClick={() => {
        Router.push(`/orderHistory/${product.id}`);
      }}
    >
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
        <div className={styles.name}>{product.name}</div>

        <div className={styles.status}>{status}</div>
      </section>
      <div className={styles.date}>Delivered on 13 Jan 2022</div>
    </div>
  );
};

export default OrderHistoryProduct;
