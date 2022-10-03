import React from "react";
import AdminLayout from "../../../../components/Admin/AdminNav";

import styles from "../../../../styles/components/Admin/pages/EditPageSettings.module.scss";

const EditPageSettings: React.FC = () => {
  return (
    <>
      <AdminLayout>
        <div className={styles.editPageSettings}>
          <div className={styles.title}>
            <h1>Edit Page Settings</h1>
          </div>
          <div className={styles.options}>
            <ul>
              <li>Edit Loader animation</li>
              <li>Edit Logo & Favicon</li>
              <li>Website Maintance</li>
              <li>Edit HomePage Banner</li>
              <li>Edit 404 Error Banner</li>
              <li>Efit Homepage</li>
            </ul>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default EditPageSettings;
