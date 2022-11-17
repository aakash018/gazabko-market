import React, { useRef } from "react";

import styles from "../../../styles/components/Admin/pages/ProductReviews.module.scss";
import AdminLayout from "../../../components/Admin/AdminNav";
import ProductReviewsHolder from "../../../components/Admin/shared/ProductReviewsHolder";
import SearchBar from "../../../components/Admin/shared/SearchBar";

const ProductReviews = () => {
  const searchRef = useRef<HTMLInputElement>(null);

  return (
    <AdminLayout>
      <h1>Product Reviews</h1>
      <div className={styles.productReviews}>
        <div className={styles.search}>
          <SearchBar inputRef={searchRef} />
        </div>
        <div className={styles.reviews}>
          <ProductReviewsHolder />
          <ProductReviewsHolder />
          <ProductReviewsHolder />
          <ProductReviewsHolder />
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductReviews;
