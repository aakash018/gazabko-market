import Router from "next/router";
import React, { useState } from "react";
import { IoMdNotifications, IoMdWarning } from "react-icons/io";

import Image from "next/image";

import styles from "../../styles/components/shared/NotificationHolder.module.scss";
import { FiPackage } from "react-icons/fi";

interface Props {
  notiOpen: boolean;
  setNotiOpen: React.Dispatch<React.SetStateAction<boolean>>;

  orderOpen: boolean;
  setOrderOpen: React.Dispatch<React.SetStateAction<boolean>>;

  warningOpen: boolean;
  setWarningOpen: React.Dispatch<React.SetStateAction<boolean>>;

  //   orderOpen: boolean;
  //   setOrderOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AlertsProps {
  title: string;
  type?: "Noti" | "Order" | "Warning";
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
              tag="Out Of Stock"
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
        {type === "Warning" && (
          <>
            <WarningHolder
              date="22 September 2022"
              imgUrl={"/images/shoes.jpg"}
              tag={"Product Reported"}
              name={"Goldstar G10 Starlite 4 Black/Red Shoes For Men"}
            />
            <WarningHolder
              date="22 September 2022"
              imgUrl={"/images/brand.png"}
              tag={"Vendor Reported"}
              name={"Gorkha Laxmi Store"}
            />
          </>
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

interface WarningHolderProps {
  imgUrl: string;
  tag: string;
  name: string;
  date: string;
}

const WarningHolder: React.FC<WarningHolderProps> = ({
  date,
  imgUrl,
  name,
  tag,
}) => {
  return (
    <>
      <div className={styles.notiHolder}>
        <div className={styles.img}>
          <Image src={imgUrl} width={50} height={50} objectFit="cover" />
        </div>
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
  warningOpen,
  setWarningOpen,
}) => {
  const [type, setType] = useState<"Noti" | "Order" | "Warning">("Noti");

  const handleToggleNoti = () => {
    if (orderOpen) setOrderOpen(false);
    if (warningOpen) setWarningOpen(false);
    if (setNotiOpen) {
      setType("Noti");
      setNotiOpen((prev) => !prev);
    }
  };

  const handleToggleOrder = () => {
    if (notiOpen) setNotiOpen(false);
    if (warningOpen) setWarningOpen(false);
    if (setOrderOpen) {
      setType("Order");
      setOrderOpen((prev) => !prev);
    }
  };
  const handleToggleWarning = () => {
    if (notiOpen) setNotiOpen(false);
    if (orderOpen) setOrderOpen(false);
    if (setWarningOpen) {
      setType("Warning");
      setWarningOpen((prev) => !prev);
    }
  };

  return (
    <div
      className={`${styles.headerBar} ${
        notiOpen || orderOpen || warningOpen ? styles.activeNoti : ""
      }`}
    >
      <div className={styles.icons}>
        <FiPackage onClick={handleToggleOrder} />
        <IoMdNotifications onClick={handleToggleNoti} />
        <IoMdWarning onClick={handleToggleWarning} />
      </div>
      <Alerts
        title={`${notiOpen ? "Notifications" : ""} ${
          orderOpen ? "Orders" : ""
        } ${warningOpen ? "Reports" : ""}`}
        type={type}
      />
    </div>
  );
};

export default NotificationHolder;
