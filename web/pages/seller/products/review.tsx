import React from "react";
import ProductReviewHolder from "../../../components/Admin/shared/ProductReviewHolder";
import ProductReviewsHolder from "../../../components/Admin/shared/ProductReviewsHolder";
import SellerNav from "../../../components/Seller/SellerNav";

import styles from "../../../styles/components/Seller/pages/ProductReviews.module.scss";

const Review = () => {
  return (
    <SellerNav>
      <h1>Products Review</h1>
      <div className={styles.reviews}>
        <ProductReviewsHolder />
        <ProductReviewsHolder />
        <ProductReviewsHolder />
        <ProductReviewsHolder />
        <ProductReviewsHolder />
        <ProductReviewsHolder />
      </div>
    </SellerNav>
  );
};

export default Review;
