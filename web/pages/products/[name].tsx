import React from "react";
import { useRouter } from "next/router";
import ProductInfoDisplay from "../../components/Customer/ProductDisplay";
import Layout from "../../components/Customer/Layout";
import styles from "../../styles/components/Customer/pages/ProductDisplay.module.scss";

const ProductDisplay: React.FC = () => {
  const router = useRouter();
  const { name } = router.query;
  return (
    <Layout sidebar="hide">
      <div className={styles.productDisplay}>
        <div className={styles.productInfo}>
          <ProductInfoDisplay
            totalStock={5}
            discount={700}
            mp={2700}
            name={"Ultra Light 3 Layer Silicone Jacket For Men"}
            rating={4.7}
            sellerName="Siwakoti Photocopy and Electronics"
          />
        </div>

        <div className={styles.review}>
          <section className={styles.title}></section>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDisplay;
