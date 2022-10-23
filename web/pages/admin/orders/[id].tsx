import React from "react";
import AdminLayout from "../../../components/Admin/AdminNav";
import OrderTracker from "../../../components/shared/Customer/OrderTracker";

import styles from "../../../styles/components/Admin/pages/OrderDetails.module.scss";

const OrderDetails = () => {
  return (
    <AdminLayout>
      <h1>Order Details</h1>
      <div className={styles.orderDetails}>
        <div className={styles.tracker}>
          <OrderTracker />
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrderDetails;
