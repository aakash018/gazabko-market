import Image from "next/image";
import Router from "next/router";
import React from "react";
import { FollowerType } from "../../../@types/global";

import styles from "../../../styles/components/shared/Admin/CustomersInfoHolder.module.scss";
import Button from "../../shared/Button";

interface UserHolderProps {
  name: string;
  route: string;
  img: string;
}

const UserHolder: React.FC<UserHolderProps> = ({ name, route, img }) => {
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
          <Image src={img} width={50} height={50} />
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
  customers: FollowerType[];
}

const CustomersInfoHolder: React.FC<Props> = ({
  title,
  onViewClick,
  customers,
}) => {
  return (
    <div className={styles.customersInfoHolder}>
      <div className={styles.title}>{title}</div>
      <div className={styles.customers}>
        {customers.map((customer, i) => (
          <UserHolder
            key={i}
            name={`${customer.user.lastName}`}
            route={`/seller/customers/${customer.userId}`}
            img={customer.user.avatar}
          />
        ))}
      </div>
      <div className={styles.actBtn}>
        <Button onClick={onViewClick}>View All</Button>
      </div>
    </div>
  );
};

export default CustomersInfoHolder;
