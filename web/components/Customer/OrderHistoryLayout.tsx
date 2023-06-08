import Link from "next/link";
import React from "react";
import Layout from "./Layout";
import styles from "../../styles/components/Customer/pages/OrderHistoryPage.module.scss";

const OrderHistoryLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Layout>
      <div className={styles.orderHistory}>
        <div className={styles.optionsHolder}>
          <div className={styles.orderHistoryNav}>
            <div className={styles.title}>
              <Link href={"/orderHistory"}>
                <a>My Orders</a>
              </Link>
            </div>
            <ul>
              <li>My Returns</li>
              <li>My Cancellations</li>
            </ul>
          </div>
          <div className={styles.orderHistoryNav}>
            <div className={styles.title}>
              <Link href="/orderHistory/wishlist">
                <a>My Wishlist</a>
              </Link>
            </div>
          </div>
          <div className={styles.orderHistoryNav}>
            <div className={styles.title}>
              <Link href="/orderHistory/reviews">
                <a>My Reviews</a>
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.layout}>{children}</div>
      </div>
    </Layout>
  );
};

export default OrderHistoryLayout;
