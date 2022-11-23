import React, { useState } from "react";
import AdminLayout from "../../../../components/Admin/AdminNav";
import ImageUploader from "../../../../components/shared/ImageUploader";

import styles from "../../../../styles/components/Admin/pages/Edit404Banner.module.scss";

const EditPageSettings = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <AdminLayout>
      <h1>Edit 404 Banner</h1>
      <div className={styles.edit404Banner}>
        <div className={styles.imageUploderHolder}>
          <h2>Add a 404 Error Banner</h2>
          <div className={styles.subTitle}>
            This banner will show up whenever user visites unmade pages
          </div>
          <ImageUploader
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            width={600}
            height={300}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditPageSettings;
