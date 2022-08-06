import React from "react";
import { ProductHolderTypes } from "../../@types/global";

import styles from "../../styles/components/Customer/ProductShowCase.module.scss";
import Timer from "../shared/Customer/Timer";

import ScrollContainer from "react-indiana-drag-scroll";
import ProductHolder from "../shared/Customer/ProductHolder";

interface Props {
  includeTimer: boolean;
  expireDate?: number;
  title: string;
  products?: ProductHolderTypes[];
}

const ShowCase: React.FC<Props> = ({
  includeTimer,
  expireDate,
  title,
  products,
}) => {
  return (
    <div className={styles.productShowCase}>
      <section className={styles.productShowCase__title}>
        <div className={styles.productShowCase__title_left}>
          <span className={styles.productShowCase__title_text}>{title}</span>
          {includeTimer && expireDate && (
            <span className={styles.productShowCase__title_date}>
              <span className={styles.productShowCase__title_date_text}>
                ENDS IN
              </span>
              <Timer date={expireDate} />
            </span>
          )}
        </div>
        <span className={styles.productShowCase__title_right}>View More</span>
      </section>
      <div className={`line ${styles.divider}`} />
      <section className={styles.productShowCase__products}>
        <ProductHolder
          mp={2700}
          discount={2000}
          rating={4.1}
          productName={"GoldStar Shoes P302 Black"}
        />
        <ProductHolder
          mp={2700}
          discount={100}
          rating={4.1}
          productName={"GoldStar Shoes P302 Black"}
        />
        <ProductHolder
          mp={2700}
          discount={2000}
          rating={4.1}
          productName={"GoldStar Shoes P302 Black"}
        />
        <ProductHolder
          mp={2700}
          discount={2000}
          rating={4.1}
          productName={"GoldStar Shoes P302 Black"}
        />
      </section>
    </div>
  );
};

export default ShowCase;
