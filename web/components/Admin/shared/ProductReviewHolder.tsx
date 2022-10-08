import Image from "next/image";
import React from "react";
import styles from "../../../styles/components/Admin/ProductReviewHolder.module.scss";
import Button from "../../shared/Button";

const ProductReviewHolder = () => {
  return (
    <div className={styles.productReviewHolder}>
      <div className={styles.img}>
        <Image src={"/images/shoes.jpg"} width={200} height={200} />
      </div>
      <div className={styles.info}>
        <div className={styles.productName}>
          Goldstar G10 Starlite 4 Black/Red Shoes For Men
        </div>
        <div className={styles.priceAndView}>
          <div className={styles.price}>Rs. 2200</div>
          <Button>View Product</Button>
        </div>
        <div className={styles.review}>
          <div className={styles.header}>
            <div className={styles.profile}>
              <div className={styles.profilePic}>
                <Image src={"/images/avatar.jpg"} width={50} height={50} />
              </div>
              <div className={styles.nameAndDate}>
                <div className={styles.name}>Jon Leona</div>
                <div className={styles.date}>27 July 2022</div>
              </div>
            </div>
            <div className={styles.tag}>Scan or misguiding product</div>
          </div>
          <div className={styles.content}>
            This product is a scam. I bought it and it was a scam...This product
            is a scam. I bought it and it was a scam...This product is a scam. I
          </div>
        </div>
        <div className={styles.actBtn}>
          <Button color="success">Dismiss</Button>
          <Button color="default">View Vender</Button>
          <Button color="error">Hide Product</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductReviewHolder;
