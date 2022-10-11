import React from "react";
import { GiCancel } from "react-icons/gi";

import styles from "../../../styles/components/Admin/SelectedItemHolder.module.scss";

interface Props {
  content: string;
  onCancel: () => void;
  onTagClick?: () => void;
}

const SelectedItemHolder: React.FC<Props> = ({
  content,
  onCancel,
  onTagClick,
}) => {
  return (
    <div className={styles.selectedItemHolder}>
      <div className={styles.cancel} onClick={onCancel}>
        <GiCancel />
      </div>
      <div
        className={styles.text}
        onClick={() => {
          if (onTagClick) onTagClick();
        }}
      >
        {content}
      </div>
    </div>
  );
};

export default SelectedItemHolder;
