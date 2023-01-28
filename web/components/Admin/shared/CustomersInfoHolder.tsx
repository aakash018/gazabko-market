import Image from "next/image";
import Router from "next/router";
import React from "react";
import { FollowerResponseType, FollowerType } from "../../../@types/global";

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
  customers: FollowerResponseType[];
  type?: "seller" | "admin";
}

const CustomersInfoHolder: React.FC<Props> = ({
  title,
  customers,
  type = "seller",
}) => {
  return (
    <div className={styles.customersInfoHolder}>
      <div className={styles.title}>{title}</div>
      <div className={styles.customers}>
        {customers.map((customer, i) => (
          <UserHolder
            key={i}
            name={`${customer.lastName}`}
            route={`/${type}/customers/id?uid=${customer.id}`}
            img={customer.avatar}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomersInfoHolder;
