import React from "react";
import AdminLayout from "../../../../components/Admin/AdminNav";

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
        </div>
      </AdminLayout>
    </>
  );
};

export default EditHomepage;
