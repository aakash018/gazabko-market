import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Customer/Layout";
import ShowCase from "../../components/Customer/ShowCase";

import styles from "../../styles/components/Customer/pages/SearchResult.module.scss";

const SearchResult: React.FC = () => {
  const router = useRouter();
  const { parameter } = router.query;

  return (
    <Layout sidebar="hide" type="search">
      <div className={styles.searchResults}>
        <div className={styles.title}>Search results for "{parameter}"</div>
        <ShowCase includeTimer={false} noOfProducts={16} />
      </div>
    </Layout>
  );
};

export default SearchResult;
