import Router from "next/router";
import React from "react";
import { IoMdNotifications, IoMdWarning } from "react-icons/io";

import Image from "next/image";

import styles from "../../styles/components/shared/NotificationHolder.module.scss";
import { FiPackage } from "react-icons/fi";
import { off } from "process";

interface Props {
  notiOpen: boolean;
  setNotiOpen: React.Dispatch<React.SetStateAction<boolean>>;

  orderOpen: boolean;
  setOrderOpen: React.Dispatch<React.SetStateAction<boolean>>;

  //   orderOpen: boolean;
  //   setOrderOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AlertsProps {
  title: string;
  type: "Order" | "Noti" | "Report";
}

const Alerts: React.FC<AlertsProps> = ({ title, type }) => {
  return (
    <div className={styles.notification}>
      <div className={styles.title}>{title}</div>
      <div className="line"></div>
      <div className={styles.notiHolderContainer}>
        {type === "Noti" && (
          <div>
            <NotiHolder
              imgUrl="/images/shoes4.jpeg"
              date="22 May 2004"
              name="Goldstar G10 Starlite 4 Black/Red Shoes For Men"
              tag="Cancled Order"
            />
            <NotiHolder
              imgUrl="/images/shoes4.jpeg"
              date="22 May 2004"
              name="Goldstar G10 Starlite 4 Black/Red Shoes For Men"
              tag="Out Of Order"
            />
            <NotiHolder
              date="22 May 2004"
              name="Newly Added Customers (200/200)"
              tag="Goal Fullfulied"
            />
          </div>
        )}
        {type === "Order" && (
          <div>
            <OrderHolder />
            <OrderHolder />
            <OrderHolder />
            <OrderHolder />
          </div>
        )}
      </div>
    </div>
  );
};

const OrderHolder: React.FC = () => {
  return (
    <>
      <div
        className={styles.notiHolder}
        onClick={() => {
          Router.push("/admin/orders/54545465465");
        }}
      >
        <div className={styles.img}>
          <Image src={"/images/shoes4.jpeg"} width={50} height={50} />
        </div>
        <div className={styles.info}>
          <div className={styles.name}>
            Goldstar G10 Starlite 4 Black/Red Shoes For Men
          </div>
          <div className={styles.quantity}>
            Quantity
            <span>3</span>
          </div>
          <div className={styles.date}>22 June 2022</div>
        </div>
      </div>
      <div className="line"></div>
    </>
  );
};

interface NotiHolderProps {
  imgUrl?: string;
  name: string;
  tag: string;
  date: string;
}

const NotiHolder: React.FC<NotiHolderProps> = ({ imgUrl, name, tag, date }) => {
  return (
    <>
      <div className={styles.notiHolder}>
        {imgUrl && <Image src={imgUrl} width={50} height={50} />}
        <div className={styles.info}>
          <div className={styles.tag}>{tag}</div>
          <div className={styles.name}>{name}</div>
          <div className={styles.date}>{date}</div>
        </div>
      </div>
      <div className="line"></div>
    </>
  );
};

const NotificationHolder: React.FC<Props> = ({
  notiOpen,
  setNotiOpen,
  orderOpen,
  setOrderOpen,
}) => {
  const handleToggleNoti = () => {
    if (orderOpen) setOrderOpen(false);
    if (setNotiOpen) setNotiOpen((prev) => !prev);
  };

  const handleToggleOrder = () => {
    if (notiOpen) setNotiOpen(false);
    if (setOrderOpen) setOrderOpen((prev) => !prev);
  };

  return (
    <div
      className={`${styles.headerBar} ${
        notiOpen || orderOpen ? styles.activeNoti : ""
      }`}
    >
      <div className={styles.icons}>
        <FiPackage onClick={handleToggleOrder} />
        <IoMdNotifications onClick={handleToggleNoti} />
        <IoMdWarning onClick={handleToggleNoti} />
      </div>
      <Alerts
        title={`${notiOpen ? "Notification" : "Orders"}`}
        type={`${notiOpen ? "Noti" : "Order"}`}
      />
    </div>
  );
};

export default NotificationHolder;
