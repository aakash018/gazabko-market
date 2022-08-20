import React from "react";
import { MdCancel } from "react-icons/md";
import styles from "../../styles/components/shared/AlertBox.module.scss";

interface Props {
  type: "error" | "message";
  message: string;
  show: boolean;
}

const AlertBox: React.FC<Props> = ({ type, message, show }) => {
  return (
    <div
      className={`${styles.alertBox} ${show ? styles.show : styles.hide} ${
        type === "error" ? styles.error : ""
      }`}
    >
      <section className={styles.message}>{message}</section>
      <section className={styles.cancel}>
        <MdCancel />{" "}
      </section>
    </div>
  );
};

export default AlertBox;
