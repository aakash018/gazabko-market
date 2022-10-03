import React, { useRef } from "react";
import AdminLayout from "../../../../components/Admin/AdminNav";
import Button from "../../../../components/shared/Button";
import IntputField from "../../../../components/shared/Input";
import SliderButton from "../../../../components/shared/SliderButton";

import styles from "../../../../styles/components/Admin/pages/WebMaintance.module.scss";

const WebMaintance = () => {
  const messageInput = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.webMaintance}>
      <AdminLayout>
        <div className={styles.title}>
          <h1>Edit General Pages</h1>
        </div>

        <div className={styles.content}>
          <div className={styles.title} >
            <h2>Website Maintance</h2>
          </div>
          <div className={styles.contentGroup}>
            <div className={styles.subject}>
              <div className={styles.title}>Maintance mode</div>
              <SliderButton />
            </div>
            <div className={styles.note}>
              (Note: Users won’t be able to access your site when this mode is
              truned on)
            </div>
          </div>
          <div className={styles.contentGroup}>
            <div className={styles.title}>Maintance mode message</div>
            <IntputField input={messageInput} />
            <Button>Save</Button>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};

export default WebMaintance;
