import React from "react";
import AdminLayout from "../../../../components/Admin/AdminNav";
import SliderButton from "../../../../components/shared/SliderButton";

import styles from "../../../../styles/components/Admin/pages/EditHomepage.module.scss";

const EditHomepage: React.FC = () => {
  return (
    <>
      <AdminLayout>
        <div>
          <h1>Edit Page</h1>
        </div>
        <div className={styles.editHomepage}>
          <div className={styles.title}>
            <h2>Edit Homepage</h2>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 30,
              alignItems: "center",
              marginTop: "80px",
            }}
          >
            <div className={styles.optHolder}>
              <div className={styles.tag}>Show Top Banner</div>
              <div className={styles.bth}>
                <SliderButton />
              </div>
            </div>
            <div className={styles.optHolder}>
              <div className={styles.tag}>Show Left Banner</div>
              <div className={styles.bth}>
                <SliderButton />
              </div>
            </div>
            <div className={styles.optHolder}>
              <div className={styles.tag}>Show Left Banner</div>
              <div className={styles.bth}>
                <SliderButton />
              </div>
            </div>
            <div className={styles.optHolder}>
              <div className={styles.tag}>Show Right Banner</div>
              <div className={styles.bth}>
                <SliderButton />
              </div>
            </div>
            <div className={styles.optHolder}>
              <div className={styles.tag}>Show Mid Page Banner</div>
              <div className={styles.bth}>
                <SliderButton />
              </div>
            </div>
            <div className={styles.optHolder}>
              <div className={styles.tag}>Show Top Deals</div>
              <div className={styles.bth}>
                <SliderButton />
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default EditHomepage;
