import React from "react";
import AdminLayout from "../../../../components/Admin/AdminNav";

import styles from "../../../../styles/components/Admin/pages/productReviews.module.scss";

const ProductReviews: React.FC = () => {
  return (
    <AdminLayout>
      <div>
        <h1>Product Reviews</h1>
      </div>
      <div className={styles.productReviews}></div>
    </AdminLayout>
  );
};

export default ProductReviews;
