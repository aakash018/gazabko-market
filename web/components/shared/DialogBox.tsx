import React from "react";
import styles from "../../styles/components/shared/DialogBox.module.scss";

interface Props {
  children: React.ReactNode;
  title: string;
}

const DialogBox: React.FC<Props> = ({ children, title }) => {
  return (
    <div>
      <div className={styles.dialogBox}>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default DialogBox;
