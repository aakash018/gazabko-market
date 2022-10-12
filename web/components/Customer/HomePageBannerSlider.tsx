import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import styles from "../../styles/components/Customer/HomePageBannerSlider.module.scss";

const HomePageBannerSlider: React.FC = () => {
  const [showImage, setShowImage] = useState<number>(1);

  const incImage = () => {
    if (showImage === 3) {
      return setShowImage(1);
    }

    setShowImage((prev) => prev + 1);
  };

  const decImage = () => {
    if (showImage === 1) {
      return setShowImage(3);
    }
    setShowImage((prev) => prev - 1);
  };

  useEffect(() => {
    const timeChange = setInterval(() => {
      incImage();
    }, 5000);

    return () => clearInterval(timeChange);
  }, [showImage]);

  return (
    <div>
    <div className={styles.homePageBannerSlider}>
      <div
        className={`${styles.imageContainer} ${showImage === 1 ? styles.show : ""
          }`}
      >
        <div className={styles.imageHolder}>
          <Image
            src={"/images/homeSlideBanner/samsung.jpg"}
            layout="fill"
            objectFit="cover"
            alt="sasung"
          />
        </div>
      </div>
      <div
        className={`${styles.imageContainer} ${showImage === 2 ? styles.show : ""
          }`}
      >
        <div className={styles.imageHolder}>
          <Image
            src={"/images/homeSlideBanner/lg.jpg"}
            layout="fill"
            objectFit="cover"
            alt="lg"
          />
        </div>
      </div>
      <div
        className={`${styles.imageContainer} ${showImage === 3 ? styles.show : ""
          }`}
      >
        <div className={styles.imageHolder}>
          <Image
            src={"/images/homeSlideBanner/apple.jpg"}
            layout="fill"
            objectFit="cover"
            alt="apple"
          />
        </div>
      </div>
      <div className={styles.navBtnLeft} onClick={decImage}>
        <AiFillLeftCircle />
      </div>
      <div className={styles.navBtnRight} onClick={incImage}>
        <AiFillRightCircle />
      </div>
    </div>
    </div>
  );
};

export default HomePageBannerSlider;
