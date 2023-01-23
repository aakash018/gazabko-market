import Image from "next/image";
import Router from "next/router";
import React from "react";
import { BsStarFill } from "react-icons/bs";
import { ReviewType } from "../../../@types/rrr";

import styles from "../../../styles/components/Admin/ProductReviewsHolder.module.scss";
import Button from "../../shared/Button";

interface Props {
  review: ReviewType;
}

const ProductReviewsHolder: React.FC<Props> = ({ review }) => {
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
          <div className={styles.productName}>{review.product?.name}</div>
          <div className={styles.priceAndRating}>
            <div className={styles.price}>
              Rs.{review.product?.priceAfterDiscount}
            </div>
            <div className={styles.rating}>
              <BsStarFill />
              <span>{review.rating}</span>
            </div>
          </div>
          <div className={styles.review}>
            <div className={styles.header}>
              <div className={styles.profile}>
                <div className={styles.profilePic}>
                  <Image src={review.user!.avatar} width={50} height={50} />
                </div>
                <div className={styles.nameAndDate}>
                  <div className={styles.name}>
                    {review.user?.firstName} {review.user?.lastName}
                  </div>
                  <div className={styles.date}>{review.created_at}</div>
                </div>
              </div>
            </div>
            <div className={styles.content}>{review.review}</div>
          </div>
          <div className={styles.actBtn}>
            <Button
              onClick={() =>
                Router.push(`/seller/products/${review.product?.id}`)
              }
            >
              View Product
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReviewsHolder;
