import Image from "next/image";
import React from "react";
import styles from "../../../styles/components/shared/Customer/ProductHolder.module.scss";

import { AiFillStar } from "react-icons/ai";
import { BsFillTagsFill } from "react-icons/bs";
import { ProductHolderTypes } from "../../../@types/global";
import Router from "next/router";
import PriceHolder from "./PriceHolder";

interface Props extends ProductHolderTypes {
  fontSize?: number | string;
}

const ProductHolder: React.FC<Props> = ({
  productName,
  mp,
  discount,
  rating,
  fontSize = "1.8rem",
}) => {
  let price: number = 0;
  let discountPercentage: number = 0;

  if (discount && discount !== 0) {
    price = mp - discount;

    discountPercentage = (discount / mp) * 100;
  }

  const handleProductClick = () => {
    Router.push("/products/Acoolproduct");
  };

  return (
    <div
      className={styles.productHolder}
      onClick={handleProductClick}
      style={{ fontSize: fontSize }}
    >
      {discount !== 0 && (
        <div className={styles.productHolder__tag}>
          <div className={styles.productHolder__tag_icon}>
            <BsFillTagsFill size={33} />
          </div>
          <span className={styles.productHolder__tag_info}>
            {Math.ceil(discountPercentage)}%
          </span>
        </div>
      )}
      <section className={styles.productHolder__productImg}>
        <Image src="/images/shoes.jpg" layout="fill" alt="product" />
      </section>
      <section className={styles.productHolder__productInfo}>
        <section className={styles.productHolder__productInfo_name}>
          {productName}
        </section>
        <section className={styles.productHolder__productInfo_price}>
          <PriceHolder discount={discount} mp={mp} />
        </section>
        <section className={styles.productHolder__productInfo_rating}>
          <AiFillStar color="#F2C94C" size={15} />
          {rating}
        </section>
      </section>
    </div>
  );
};

export default ProductHolder;
