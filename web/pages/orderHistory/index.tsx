import React from "react";
import OrderHistoryLayout from "../../components/Customer/OrderHistoryLayout";
import OrderHistoryProduct from "../../components/shared/Customer/orderHistoryProduct";
import styles from "../../styles/components/Customer/pages/OrderHistoryPage.module.scss";

const OrderHistoryPage: React.FC = () => {
  return (
    <OrderHistoryLayout>
      <div className={styles.title}>Order History</div>
      <OrderHistoryProduct />
      <OrderHistoryProduct />
      <OrderHistoryProduct />
      <OrderHistoryProduct />
      <OrderHistoryProduct />
    </OrderHistoryLayout>
  );
};

export default OrderHistoryPage;
