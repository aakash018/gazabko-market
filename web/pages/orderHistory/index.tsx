import React from "react";
import Layout from "../../components/Customer/Layout";
import OrderHistoryProduct from "../../components/shared/Customer/orderHistoryProduct";
import styles from "../../styles/components/Customer/pages/OrderHistoryPage.module.scss";

const OrderHistoryPage: React.FC = () => {
  return (
    <Layout sidebar="clickable">
      <div className={styles.orderHistory}>
        <div>
          <div className={styles.orderHistoryNav}>
            <div className={styles.title}>My Orders</div>
            <ul>
              <li>My Returns</li>
              <li>My Cancellations</li>
            </ul>
          </div>
          <div className={styles.orderHistoryNav}>
            <div className={styles.title}>My Wishlist</div>
          </div>
          <div className={styles.orderHistoryNav}>
            <div className={styles.title}>My Reviews</div>
          </div>
        </div>

        <div className={styles.products}>
          <div className={styles.title}>Order History</div>

          <OrderHistoryProduct />
          <OrderHistoryProduct />
          <OrderHistoryProduct />
          <OrderHistoryProduct />
          <OrderHistoryProduct />
        </div>
      </div>
    </Layout>
  );
};

export default OrderHistoryPage;
