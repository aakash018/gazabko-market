import React from "react";
import styles from "../../../styles/components/shared/Admin/EditOptionsButton.module.scss";

interface Props {
  icon: React.ReactNode;
  text: string;
  bgColor: string;
  onClick: () => void;
}

const EditOptionsButton: React.FC<Props> = ({
  icon,
  text,
  bgColor,
  onClick,
}) => {
  return (
    <div
      className={styles.editOptionsButton}
      style={{ backgroundColor: bgColor }}
      onClick={onClick}
    >
      <div className={styles.icon}>{icon}</div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default EditOptionsButton;
