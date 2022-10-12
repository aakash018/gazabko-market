import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Customer/Layout";
import ShowCase from "../../components/Customer/ShowCase";
import styles from "../../styles/components/Customer/pages/CatogriesPage.module.scss";

const CategoriesPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout sidebar="hide" type="catogryPage">
      <div className={styles.catogriesPage}>
        <div className={styles.topProduct}>
          <ShowCase showTitle={true} title="Top Brands" type="brand" />
          <ShowCase title="All Products" showTitle={true} noOfProducts={20} />
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesPage;
