import React, { useState } from "react";
import Image from "next/image";
import { MdSpaceDashboard } from "react-icons/md";
import { BiPackage } from "react-icons/bi";
import { RiAccountCircleFill } from "react-icons/ri";
import Router from "next/router";
import Button from "../../components/shared/Button";
import styles from "../../styles/components/Seller/SellerNav.module.scss";
import { TbTruckDelivery } from "react-icons/tb";
import { FaPercentage } from "react-icons/fa";
import NotificationHolder from "../shared/NotificationHolder";

interface Props {
  children: React.ReactNode;
}

const SellerNav: React.FC<Props> = ({ children }) => {
  const [notiOpen, setNotiOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);

  return (
    <>
      <NotificationHolder
        notiOpen={notiOpen}
        orderOpen={orderOpen}
        warningOpen={warningOpen}
        setOrderOpen={setOrderOpen}
        setNotiOpen={setNotiOpen}
        setWarningOpen={setWarningOpen}
      />
      <div className={styles.admin}>
        <div className={styles.adminNav}>
          <div className={styles.logo}>
            <Image src="/images/logo.png" width={180} height={60} alt="logo" />
          </div>
          <div className={styles.navigation}>
            <Button
              look="blank"
              onClick={() => {
                Router.push("/seller/dash");
              }}
            >
              <span>
                <MdSpaceDashboard size={"3rem"} color="#4F2496" />
              </span>
              <span style={{ color: "#757575", marginTop: "-6px" }}>
                DashBoard
              </span>
            </Button>
            <Button
              look="blank"
              onClick={() => {
                Router.push("/seller/edit");
              }}
            >
              <span>
                <BiPackage size={"3rem"} color="#4F2496" />
              </span>
              <span style={{ color: "#757575", marginTop: "-6px" }}>
                Product
              </span>
            </Button>
            <Button
              look="blank"
              onClick={() => {
                Router.push("/seller/seller");
              }}
            >
              <span>
                <TbTruckDelivery size={"3rem"} color="#4F2496" />
              </span>
              <span style={{ color: "#757575", marginTop: "-6px" }}>
                Orders
              </span>
            </Button>
            <Button
              look="blank"
              onClick={() => {
                Router.push("/seller/customers");
              }}
            >
              <span>
                <FaPercentage size={"3rem"} color="#4F2496" />
              </span>
              <span style={{ color: "#757575", marginTop: "-6px" }}>
                Commissions
              </span>
            </Button>
            <Button
              look="blank"
              onClick={() => {
                Router.push("/seller/account");
              }}
            >
              <span>
                <RiAccountCircleFill size={"3rem"} color="#4F2496" />
              </span>
              <span style={{ color: "#757575", marginTop: "-6px" }}>
                Account
              </span>
            </Button>
          </div>
          <div className={styles.logoutBtn}>
            <Button look="outlined" color="error">
              <span style={{ color: "var(--default-red)", fontWeight: 700 }}>
                LOGOUT
              </span>
            </Button>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.wrapper}>
            <div className={styles.container}>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerNav;
