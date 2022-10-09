import React from "react";
import AdminLayout from "../../../../components/Admin/AdminNav";
import ProductReviewHolder from "../../../../components/Admin/shared/ProductReviewHolder";

import styles from "../../../../styles/components/Admin/pages/productReports.module.scss";

const ProductReviews: React.FC = () => {
  return (
    <AdminLayout>
      <div>
        <h1>Product Reviews</h1>
      </div>
      <div className={styles.productReports}>
        <ProductReviewHolder />
        <ProductReviewHolder />
        <ProductReviewHolder />
      </div>
    </AdminLayout>
  );
};

export default ProductReviews;
