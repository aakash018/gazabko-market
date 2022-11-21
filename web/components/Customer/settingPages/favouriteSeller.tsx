import Image from "next/image";
import Router from "next/router";
import React from "react";

import styles from "../../../styles/components/Customer/FavouriteSeller.module.scss";
import Button from "../../shared/Button";

const StoreHolder = () => {
  return (
    <div className={styles.storeHolder}>
      <div className={styles.storeInfo}>
        <div className={styles.logo}>
          <Image
            src={"/images/brand.png"}
            width={100}
            height={100}
            objectFit="cover"
          />
        </div>
        <div className={styles.name}>Laxmi Super Store</div>
      </div>
      <div className={styles.options}>
        <span
          style={{
            color: "var(--default-red)",
            cursor: "pointer",
          }}
        >
          Unfollow
        </span>
        <span>|</span>
        <span
          style={{
            color: "var(--theme-color)",
            cursor: "pointer",
          }}
          onClick={() => Router.push("/sellerInfo/sdfsfd")}
        >
          Visit Store
        </span>
      </div>
    </div>
  );
};

const FavouriteSeller = () => {
  return (
    <div className={styles.favouriteSeller}>
      <div className={styles.favSellerHolder}>
        <StoreHolder />
        <StoreHolder />
        <StoreHolder />
        {/* <Button look="outlined">Load More</Button> */}
      </div>
    </div>
  );
};

//UwU

export default FavouriteSeller;
