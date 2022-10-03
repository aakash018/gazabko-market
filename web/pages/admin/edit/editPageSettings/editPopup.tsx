import React from "react";
import AdminLayout from "../../../../components/Admin/AdminNav";
import AdminImageUpload from "../../../../components/Admin/shared/AdminImageUpload";
import SliderButton from "../../../../components/shared/SliderButton";

import styles from "../../../../styles/components/Admin/pages/EditPopup.module.scss";

const EditPopup: React.FC = () => {
  return (
    <>
      <AdminLayout>
        <div>
          <h1>Edit Page</h1>
        </div>
        <div className={styles.editPopup}>
          <div className={styles.title}>
            <h2>Edit Popup Banners</h2>
          </div>
          <div className={styles.disablePopup}>
            <div className={styles.text}>Disable Popup Banner</div>
            <div className={styles.action}>
              <SliderButton />
            </div>
          </div>
          <div className={styles.uploader}>
            <AdminImageUpload
              title="Popup Banners"
              imgW={600}
              imgH={300}
              buttonText="Update Popup Banner"
            />
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default EditPopup;
