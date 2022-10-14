import Image from "next/image";
import { useEffect, useState } from "react";
import CategoriesHolder from "./CategoriesHolder";
import styles from "../../styles/components/Customer/BannerSlider.module.scss";

const sliderImages = [
  {
    image: "/images/homeSlideBanner/samsung.jpg",
    backgroundColor: "#dadde9",
    alt: "samsung",
  },
  {
    image: "/images/homeSlideBanner/lg.jpg",
    backgroundColor: "#262C2A",
    alt: "lg",
  },
  {
    image: "/images/homeSlideBanner/apple.jpg",
    backgroundColor: "#03142c",
    alt: "apple",
  },
];

const BannerSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const setIndex = (index: number) => {
    if (index >= sliderImages.length) {
      setCurrentImageIndex(0);
    } else if (index < 0) {
      setCurrentImageIndex(sliderImages.length - 1);
    } else {
      setCurrentImageIndex(index);
    }
  };

  const increaseIndex = () => {
    setIndex(currentImageIndex + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      increaseIndex();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [increaseIndex]);

  return (
    <div className={styles.bannerSlider} style={{ background: sliderImages[currentImageIndex].backgroundColor }}>
      <CategoriesHolder />
      <div style={{ position: "relative", width: "100%" }}>
        {sliderImages.map((images, i) => {
          return (
            <div
              className={i === currentImageIndex ? styles.show : styles.hide}
            >
              <Image
                key={`homePageSlider-image-${i}`}
                src={images.image}
                layout="fill"
                objectFit="cover"
                alt={images.alt}
              />
            </div>
          );
        })}
        <div className={styles.bannerSliderDotContainer}>
          {sliderImages.map((_images, i) => {
            return (
              <span
                style={{
                  backgroundColor: `${
                    i === currentImageIndex ? "#fff" : "#ddd"
                  }`,
                }}
                className="homePageSlider-dot"
                key={`homePageSlider-dot-${i}`}
                onClick={() => setIndex(i)}
              ></span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;
