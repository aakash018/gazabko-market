import Image from "next/image";
import Router from "next/router";
import React from "react";
import { Order, ProtuctType } from "../../../@types/global";
import styles from "../../../styles/components/shared/Customer/orderHistoryProducts.module.scss";

interface Props {
  product: ProtuctType;
  status: "pending" | "processing" | "delivered";
  order: Order;
  canceled?: boolean;
}
const OrderHistoryProduct: React.FC<Props> = ({
  product,
  status,
  order,
  canceled,
}) => {
  return (
    <div
      className={styles.orderHistoryProduct}
      onClick={() => {
        Router.push(`/orderHistory/id?oid=${order.id}`);
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
          <div className={styles.orderNumber}>Order #{order.id}</div>
          <div className={styles.orderTime}>
            Placed on {order.created_at.split("T")[0]}
          </div>
        </section>
        {<div className={styles.name}>{product.name}</div>}

        {!canceled && <div className={styles.status}>{status}</div>}
        {canceled && <div className={styles.status}>canceled</div>}
      </section>
    </div>
  );
};

export default OrderHistoryProduct;
