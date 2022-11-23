import React, { useState } from "react";
import AdminLayout from "../../../../components/Admin/AdminNav";
import ImageUploader from "../../../../components/shared/ImageUploader";
import MultipleImageUploader from "../../../../components/shared/MultipleImageUploader";

import styles from "../../../../styles/components/Admin/pages/editHomepageBanner.module.scss";

const HomepageBannerLayout: React.FC<{
  selected: "top" | "bl" | "br" | "mp";
}> = ({ selected }) => {
  return (
    <div className={styles.homepageBannerLayout}>
      <div
        className={styles.top}
        style={{
          backgroundColor: `${
            selected === "top" ? "var(--theme-color)" : "white"
          }`,
        }}
      ></div>
      <div className={styles.bottom}>
        <div
          className={styles.left}
          style={{
            backgroundColor: `${
              selected === "bl" ? "var(--theme-color)" : "white"
            }`,
          }}
        ></div>
        <div
          className={styles.right}
          style={{
            backgroundColor: `${
              selected === "br" ? "var(--theme-color)" : "white"
            }`,
          }}
        ></div>
      </div>
      <div
        className={styles.midPage}
        style={{
          backgroundColor: `${
            selected === "mp" ? "var(--theme-color)" : "white"
          }`,
        }}
      ></div>
    </div>
  );
};

const EditHomepageBanner = () => {
  const [topBanners, settopBanners] = useState(null);
  const [bottomLeftBanner, setBottomLeftBanner] = useState(null);
  const [bottomRightBanner, setBottomRightBanner] = useState(null);
  const [midPageBanner, setmidPageBanner] = useState(null);

  return (
    <AdminLayout>
      <div className={styles.editHomepageBanner}>
        <div className={styles.imageUploader}>
          <div className={styles.content}>
            <h2>Add Banner Carousel</h2>
            <MultipleImageUploader
              width={1109}
              height={332}
              selectedImage={topBanners}
              setSelectedImage={settopBanners}
            />
          </div>
          <HomepageBannerLayout selected="top" />
        </div>
        <div className={styles.imageUploader}>
          <div className={styles.content}>
            <h2>Add Bottom left Banner</h2>
            <ImageUploader
              width={645}
              height={300}
              selectedImage={bottomLeftBanner}
              setSelectedImage={setBottomLeftBanner}
            />
          </div>
          <HomepageBannerLayout selected="bl" />
        </div>
        <div className={styles.imageUploader}>
          <div className={styles.content}>
            <h2>Add Bottom Right Banner</h2>
            <ImageUploader
              width={645}
              height={300}
              selectedImage={bottomRightBanner}
              setSelectedImage={setBottomRightBanner}
            />
          </div>
          <HomepageBannerLayout selected="br" />
        </div>
        <div className={styles.imageUploader}>
          <div className={styles.content}>
            <h2>Add Mid Page Banner</h2>
            <ImageUploader
              width={1300}
              height={200}
              selectedImage={midPageBanner}
              setSelectedImage={setmidPageBanner}
            />
          </div>
          <HomepageBannerLayout selected="mp" />
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditHomepageBanner;
