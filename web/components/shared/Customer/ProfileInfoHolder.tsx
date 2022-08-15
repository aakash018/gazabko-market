import React from "react";
import styles from "../../../styles/components/shared/Customer/ProfileInfoHolder.module.scss";
import Button from "../Button";
interface Props {
  number: number;
  title: string;
}

const ProfileInfoHolder: React.FC<Props> = ({ number, title }) => {
  return (
    <div className={styles.profileInfooHolder}>
      <div className={styles.number}>{number}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.actionBtn}>
        <Button color="error">View All</Button>
      </div>
    </div>
  );
};

export default ProfileInfoHolder;
