import Image from "next/image";
import Router from "next/router";
import React from "react";
import SellerNav from "../../../components/Seller/SellerNav";
import Button from "../../../components/shared/Button";
import IntputField from "../../../components/shared/Input";

import styles from "../../../styles/components/Seller/pages/QuestionsAsked.module.scss";

const QuestionsHolder: React.FC = () => {
  return (
    <div className={styles.questionsHolder}>
      <div className={styles.product}>
        <div className={styles.img}>
          <Image src={"/images/shoes3.jpg"} width={50} height={50} />
        </div>
        <div className={styles.name}>
          Golden GoldStar Treaking Shoes, Magicaal, 80K, Original
        </div>
        <div
          className={styles.options}
          onClick={() => {
            Router.push("/seller/products/sddasd");
          }}
        >
          View Product
        </div>
      </div>
      <div className={styles.asker}>
        <div className={styles.avatar}>
          <Image src="/images/avatar.jpg" width={70} height={70} />
        </div>
        <div className={styles.info}>
          <div className={styles.name}>Laxmi Bhattarai</div>
          <div className={styles.date}>22 July 2022</div>
        </div>
      </div>
      <div className={styles.question}>A really really important question</div>
      <IntputField label="Reply" />
      <Button>Post</Button>
    </div>
  );
};

const QuestionsAsked = () => {
  return (
    <SellerNav>
      <h1
        style={{
          marginBottom: 40,
        }}
      >
        Questions Asked
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",

          gap: 30,
        }}
      >
        <QuestionsHolder />
        <QuestionsHolder />
        <QuestionsHolder />
        <QuestionsHolder />
      </div>
    </SellerNav>
  );
};

export default QuestionsAsked;
