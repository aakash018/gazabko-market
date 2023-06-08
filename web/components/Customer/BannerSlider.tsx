import Image from "next/image";
import { useEffect, useState } from "react";
import CategoriesHolder from "./CategoriesHolder";
import styles from "../../styles/components/Customer/BannerSlider.module.scss";
import axios from "axios";
import { Category } from "../../@types/global";
import { useAlert } from "../../pages/_app";

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
  const [categories, setCategories] = useState<Category[]>([]);
  const { setAlert } = useAlert();
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

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const res = await axios.get<RespondType & { categories: Category[] }>(
          `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/category/getAllCategories`
        );
        console.log(res.data);
        if (res.data.status === "ok") {
          setCategories(res.data.categories);
        } else {
          setAlert({
            type: "error",
            message: res.data.message,
          });
        }
      } catch {
        setAlert({
          type: "error",
          message: "failed to connect to server",
        });
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div
      className={styles.bannerSlider}
      style={{ background: sliderImages[currentImageIndex].backgroundColor }}
    >
      <CategoriesHolder categories={categories} />
      <div style={{ position: "relative", width: "100%" }}>
        {sliderImages.map((images, i) => {
          return (
            <div
              className={i === currentImageIndex ? styles.show : styles.hide}
              key={`bannerSlider-image-${i}`}
            >
              <Image
                src={images.image}
                layout="fill"
                // height={200}
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
