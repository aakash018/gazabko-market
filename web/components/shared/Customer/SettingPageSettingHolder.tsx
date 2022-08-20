import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import styles from "../../../styles/components/shared/Customer/SettingPageSettingHolder.module.scss";

interface Props {
  title: string;
  subtitle: string;
  onClick: () => any;
}

const SettingPageSettingHolder: React.FC<Props> = ({
  title,
  subtitle,
  onClick,
}) => {
  return (
    <div className={styles.settingPageSettingsHolder} onClick={onClick}>
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.subTitle}>{subtitle}</div>
      </div>
      <div className={styles.actionBtn}>
        <IoIosArrowForward />
      </div>
    </div>
  );
};

export default SettingPageSettingHolder;
