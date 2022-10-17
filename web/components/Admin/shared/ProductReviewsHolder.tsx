import Image from "next/image";
import React from "react";
import { BsStarFill } from "react-icons/bs";

import styles from "../../../styles/components/Admin/ProductReviewsHolder.module.scss";
import Button from "../../shared/Button";

const ProductReviewsHolder = () => {
  return (
    <div>
      <div className={styles.productHolder}>
        <div className={styles.productImg}>
          <Image
            src={"/images/shoes3.jpg"}
            width={200}
            height={200}
            objectFit="cover"
          />
        </div>
        <div className={styles.info}>
          <div className={styles.productName}>
            Goldstar G10 Starlite 4 Black/Red Shoes For Men
          </div>
          <div className={styles.priceAndRating}>
            <div className={styles.price}>Rs. 2200</div>
            <div className={styles.rating}>
              <BsStarFill />
              <span>4.6</span>
            </div>
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
            </div>
            <div className={styles.content}>Very very good product</div>
          </div>
          <div className={styles.actBtn}>
            <Button color="error">Dismiss</Button>

            <Button>View Product</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReviewsHolder;
