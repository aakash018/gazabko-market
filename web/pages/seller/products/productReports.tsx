import React from "react";
import ProductReviewHolder from "../../../components/Admin/shared/ProductReviewHolder";
import SellerNav from "../../../components/Seller/SellerNav";

import styles from "../../../styles/components/Seller/pages/ProductReports.module.scss";

const ProductReports = () => {
  return (
    <SellerNav>
      <h1>Products Reported</h1>
      <div className={styles.productsReported}>
        <ProductReviewHolder showViewVendor={false} />
        <ProductReviewHolder showViewVendor={false} />
        <ProductReviewHolder showViewVendor={false} />
      </div>
    </SellerNav>
  );
};

export default ProductReports;
