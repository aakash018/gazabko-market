import Image from "next/image";
import Router from "next/router";
import React from "react";
import Layout from "../../components/Customer/Layout";

import styles from "../../styles/components/Customer/pages/CatogriesHomePage.module.scss";

const CatogriesHomePage = () => {
  const handleClick = () => {
    Router.push("/catogries/dsdsdf");
  };

  return (
    <div className={styles.catogriesHomePage}>
      <div className={styles.gallery}>
        <div
          className={`${styles.bStrech} ${styles.basic}`}
          onClick={handleClick}
        >
          <Image
            src={"/images/catogries/womenFashion.jpg"}
            layout="fill"
            objectFit="cover"
            alt="womenFashion"
          />
          <div className={styles.name}>
            <span>Women Fassion</span>
          </div>
        </div>
        <div
          className={`${styles.basic} ${styles.vStrech} `}
          onClick={handleClick}
        >
          <Image
            src={"/images/catogries/menFassion.jpg"}
            layout="fill"
            objectFit="cover"
            alt="menFassion"
          />
          <div className={styles.name}>
            <span>Men Fassion</span>
          </div>
        </div>
        <div
          className={`${styles.hStrech} ${styles.basic} `}
          onClick={handleClick}
        >
          <Image
            src={"/images/catogries/electric.jpg"}
            layout="fill"
            objectFit="cover"
            alt="electric"
          />
          <div className={styles.name}>
            <span>Electric Devices</span>
          </div>
        </div>
        <div
          className={`${styles.hStrech} ${styles.basic} `}
          onClick={handleClick}
        >
          <Image
            src={"/images/catogries/toys.jpg"}
            layout="fill"
            objectFit="cover"
            alt="toys"
          />
          <div className={styles.name}>
            <span>Toys</span>
          </div>
        </div>
        <div
          className={`${styles.hStrech} ${styles.basic} `}
          onClick={handleClick}
        >
          <Image
            src={"/images/catogries/health.jpg"}
            layout="fill"
            objectFit="cover"
            alt="health"
          />
          <div className={styles.name}>
            <span>Health and Fitness</span>
          </div>
        </div>
        <div
          className={`${styles.hStrech} ${styles.basic} `}
          onClick={handleClick}
        >
          <Image
            src={"/images/catogries/bar.jpg"}
            layout="fill"
            objectFit="cover"
            alt="bar"
          />
          <div className={styles.name}>
            <span>Gazabzo bar</span>
          </div>
        </div>
        <div className={`${styles.basic} `} onClick={handleClick}>
          <Image
            src={"/images/catogries/sports.jpg"}
            layout="fill"
            objectFit="cover"
            alt="sports"
          />
          <div className={styles.name}>
            <span>Sports</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatogriesHomePage;
