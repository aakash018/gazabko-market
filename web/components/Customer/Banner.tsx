import Image from "next/image";
import React from "react";
import styles from "../../styles/components/Customer/Banners.module.scss";

const Banner: React.FC = () => {
  return (
    <div className={styles.banners}>
      <div className={styles.banners__top}>
        <Image
          src={"/images/apple.jpg"}
          width="100%"
          height={"40px"}
          layout="responsive"
          alt="topImg"
        />
      </div>
      <div className={styles.banners__bottomBanners}>
        <div className={styles.banners__left}>
          <Image
            src={"/images/watch.jpg"}
            layout="fill"
            className={styles.banners__left_img}
            priority={true}
            alt="leftImg"
          />
        </div>
        <div className={styles.banners__right}>
          <div className={styles.banners__right_1}>
            <Image
              src={"/images/kid.jpg"}
              layout="fill"
              className={styles.banners__right_1_img}
              priority={true}
              alt="rightImage"
            />
          </div>
          <div className={styles.banners__right_2}></div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
