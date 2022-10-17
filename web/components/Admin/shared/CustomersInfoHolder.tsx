import Image from "next/image";
import React from "react";

import styles from "../../../styles/components/shared/Admin/CustomersInfoHolder.module.scss";
import Button from "../../shared/Button";

interface UserHolderProps {
  name: string;
}

const UserHolder: React.FC<UserHolderProps> = ({ name }) => {
  return (
    <div className={styles.userHolder}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div className={styles.avatar}>
          <Image src="/images/avatar.jpg" width={50} height={50} />
        </div>
        <div className={styles.name}>{name}</div>
      </div>
      <div className={styles.details}>View</div>
    </div>
  );
};

interface Props {
  title: string;
}

const CustomersInfoHolder: React.FC<Props> = ({ title }) => {
  return (
    <div className={styles.customersInfoHolder}>
      <div className={styles.title}>{title}</div>
      <div className={styles.customers}>
        <UserHolder name="Joe Mama" />
        <UserHolder name="Joe Mama" />
        <UserHolder name="Joe Mama" />
        <UserHolder name="Joe Mama" />
        <UserHolder name="Joe Mama" />
      </div>
      <div className={styles.actBtn}>
        <Button>View All</Button>
      </div>
    </div>
  );
};

export default CustomersInfoHolder;
