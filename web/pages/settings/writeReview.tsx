import React from "react";
import Layout from "../../components/Customer/Layout";
import Image from "next/image";

import styles from "../../styles/components/Customer/pages/settings/WriteReview.module.scss";
import { BsStarFill } from "react-icons/bs";
import Button from "../../components/shared/Button";

const WriteReview = () => {
  return (
    <Layout>
      <div className={styles.writeReview}></div>
    </Layout>
  );
};

export default WriteReview;
