import React from "react";
import { GiCancel } from "react-icons/gi";

import styles from "../../../styles/components/Admin/SelectedItemHolder.module.scss";

interface Props {
  content: string;
  onCancel: () => void;
}

const SelectedItemHolder: React.FC<Props> = ({ content, onCancel }) => {
  return (
    <div className={styles.selectedItemHolder}>
      <div className={styles.cancel} onClick={onCancel}>
        <GiCancel />
      </div>
      <div className={styles.text}>{content}</div>
    </div>
  );
};

export default SelectedItemHolder;
