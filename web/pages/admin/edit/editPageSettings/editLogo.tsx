import React from "react";
import AdminLayout from "../../../../components/Admin/AdminNav";
import AdminImageUpload from "../../../../components/Admin/shared/AdminImageUpload";

import styles from "../../../../styles/components/Admin/pages/EditLoader.module.scss";

const editLoader = () => {
  return (
    <>
      <AdminLayout>
        <div className={styles.editLoader}>
          <div className={styles.title}>
            <h1>Edit Page</h1>
          </div>
          <div className={styles.uploaders}>
            <AdminImageUpload title="Edit Loader" />
            <AdminImageUpload title="Edit Favicon" />
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default editLoader;
