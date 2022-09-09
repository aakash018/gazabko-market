import Image from "next/image";
import React from "react";
import styles from "../../styles/components/Customer/CatogriesGridBox.module.scss";
const CatogriesGridBox: React.FC = () => {
  return (
    <div className={styles.catogriesGridBox}>
      <div className={styles.grid}>
        <div className={styles.row}>
          <div className={styles.catBox}>
            <div className={styles.label}>Women Fashion</div>
            <div className={styles.image}>
              <Image
                src={"/images/catogries/women-small.jpg"}
                width={300}
                height={150}
                objectFit="cover"
                objectPosition={"top"}
              />
            </div>
          </div>
          <div className={styles.catBox}>
            <div className={styles.label}>Men Fashion</div>
            <div className={styles.image}>
              <Image
                src={"/images/catogries/menSmall.jpg"}
                width={300}
                height={150}
                objectFit="cover"
                objectPosition={"top"}
              />
            </div>
          </div>
          <div className={styles.catBox}>
            <div className={styles.label}>Health & Fitness</div>
            <div className={styles.image}>
              <Image
                src={"/images/catogries/healthSmall.jpg"}
                width={300}
                height={150}
                objectFit="cover"
              />
            </div>
          </div>
          <div className={styles.catBox}>
            <div className={styles.label}>Men Fashion</div>
            <div className={styles.image}>
              <Image
                src={"/images/catogries/menSmall.jpg"}
                width={300}
                height={150}
                objectFit="cover"
                objectPosition={"top"}
              />
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.catBox}>
            <div className={styles.label}>Gazabko Bar</div>
            <div className={styles.image}>
              <Image
                src={"/images/catogries/bar-small.jpg"}
                width={300}
                height={150}
                objectFit="cover"
              />
            </div>
          </div>
          <div className={styles.catBox}>
            <div className={styles.label}>Sports</div>
            <div className={styles.image}>
              <Image
                src={"/images/catogries/sportSmall.jpg"}
                width={300}
                height={150}
                objectFit="cover"
              />
            </div>
          </div>
          <div className={styles.catBox}>
            <div className={styles.label}>Toys</div>
            <div className={styles.image}>
              <Image
                src={"/images/catogries/toysSmall.jpg"}
                width={300}
                height={150}
                objectFit="cover"
              />
            </div>
          </div>
          <div className={styles.catBox}>
            <div className={styles.label}>Toys</div>
            <div className={styles.image}>
              <Image
                src={"/images/catogries/toys.jpg"}
                width={300}
                height={150}
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatogriesGridBox;
