import React, { useRef } from "react";

import styles from "../../styles/components/Admin/AddCategoriesModal.module.scss";
import Button from "../shared/Button";
import IntputField from "../shared/Input";

const AddCategoriesModal: React.FC = () => {
  const catName = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div className={styles.addCategoriesModal}>
        <IntputField input={catName} label="Category's Name" />
        <IntputField input={catName} label="Icon" type={"file"} />
        <Button>Save</Button>
      </div>
    </div>
  );
};

export default AddCategoriesModal;
