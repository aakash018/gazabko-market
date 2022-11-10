import Image from "next/image";
import Router from "next/router";
import React from "react";

import styles from "../../../styles/components/shared/Admin/CustomersInfoHolder.module.scss";
import Button from "../../shared/Button";

interface UserHolderProps {
  name: string;
  route: string;
}

const UserHolder: React.FC<UserHolderProps> = ({ name, route }) => {
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
      <div
        className={styles.details}
        onClick={() => {
          Router.push(route);
        }}
      >
        View
      </div>
    </div>
  );
};

interface Props {
  title: string;
  onViewClick: () => void;
  route: string;
}

const CustomersInfoHolder: React.FC<Props> = ({
  title,
  onViewClick,
  route,
}) => {
  return (
    <div className={styles.customersInfoHolder}>
      <div className={styles.title}>{title}</div>
      <div className={styles.customers}>
        <UserHolder name="Joe Mama" route={route} />
        <UserHolder name="Joe Mama" route={route} />
        <UserHolder name="Joe Mama" route={route} />
        <UserHolder name="Joe Mama" route={route} />
        <UserHolder name="Joe Mama" route={route} />
      </div>
      <div className={styles.actBtn}>
        <Button onClick={onViewClick}>View All</Button>
      </div>
    </div>
  );
};

export default CustomersInfoHolder;
