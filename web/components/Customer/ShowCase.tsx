import React from "react";
import {
  ProductHolderTypes,
  ProtuctPayloadType,
  ProtuctType,
} from "../../@types/global";

import styles from "../../styles/components/Customer/ProductShowCase.module.scss";
import Timer from "../shared/Customer/Timer";

import ProductHolder from "../shared/Customer/ProductHolder";
import Image from "next/image";

interface Props {
  includeTimer?: boolean;
  expireDate?: number;
  title?: string;
  products?: ProtuctType[];
  showTitle?: boolean;
  noOfProducts?: number;

  type?: "products" | "brand";
}

const ShowCase: React.FC<Props> = ({
  includeTimer,
  expireDate,
  title,
  products,
  noOfProducts = 4,
  type = "products",
}) => {
  return (
    <div className={styles.productShowCase}>
      {title && (
        <>
          <section className={styles.productShowCase__title}>
            <div className={styles.productShowCase__title_left}>
              <span className={styles.productShowCase__title_text}>
                {title}
              </span>
              {includeTimer && expireDate && (
                <span className={styles.productShowCase__title_date}>
                  <span className={styles.productShowCase__title_date_text}>
                    ENDS IN
                  </span>
                  <Timer date={expireDate} />
                </span>
              )}
            </div>
            {/*<span className={styles.productShowCase__title_right}>
              View More
            </span>*/}
          </section>
          <div className={`line ${styles.divider}`} />
        </>
      )}
      <section
        style={{ display: "flex", justifyContent: "center" }}
        className={styles.productShowCase__products}
      >
        {!products ||
          (products.length === 0 && (
            <div
              style={{
                height: "100px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <h2>No products found</h2>
            </div>
          ))}
        {products &&
          products.length !== 0 &&
          products.map((product, i) => {
            return (
              <ProductHolder
                key={i}
                mp={product.price}
                discount={product.discount ? product.discount : 0}
                rating={4.1}
                productName={product.name}
                id={product.id}
              />
            );
          })}
      </section>
    </div>
  );
};

export default ShowCase;
