import Image from "next/image";
import React from "react";
import { ReviewType } from "../../../@types/rrr";
import styles from "../../../styles/components/Admin/ProductReviewHolder.module.scss";
import Button from "../../shared/Button";

interface Props {
  showViewVendor?: boolean;
  review: ReviewType;
}

const ProductReviewHolder: React.FC<Props> = ({
  showViewVendor = true,
  review,
}) => {
  return (
    <div className={styles.productReviewHolder}>
      <div className={styles.img}>
        <Image src={"/images/shoes.jpg"} width={200} height={200} />
      </div>
      <div className={styles.info}>
        <div className={styles.productName}>{review.product?.name}</div>
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
          {showViewVendor && <Button color="default">View Vender</Button>}
          <Button color="error">Hide Product</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductReviewHolder;
