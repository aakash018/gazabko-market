import React, { useState } from "react";
import styles from "../../styles/components/Admin/AdminNav.module.scss";
import Image from "next/image";
import Button from "../shared/Button";
import { MdSpaceDashboard } from "react-icons/md";
import { AiFillDollarCircle, AiFillEdit } from "react-icons/ai";
import {
  BiBell,
  BiHappyBeaming,
  BiMessage,
  BiNotification,
} from "react-icons/bi";
import { RiAccountCircleFill } from "react-icons/ri";

import { FiPackage } from "react-icons/fi";
import Router from "next/router";
import { IoMdWarning } from "react-icons/io";
import NotificationHolder from "../shared/NotificationHolder";

interface Props {
  children: React.ReactNode;
}

const AdminLayout: React.FC<Props> = ({ children }) => {
  const [notiOpen, setNotiOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);

  const handleToggleNoti = () => {
    setNotiOpen((prev) => !prev);
  };

  return (
    <div>
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
            <Image
              src="/images/adminLogo.png"
              width={180}
              height={60}
              alt="logo"
            />
          </div>
          <div className={styles.navigation}>
            <Button
              look="blank"
              onClick={() => {
                Router.push("/admin/dash");
              }}
            >
              <span>
                <MdSpaceDashboard size={"3rem"} color="#333333" />
              </span>
              <span style={{ marginTop: "-6px" }}>DashBoard</span>
            </Button>
            <Button
              look="blank"
              onClick={() => {
                Router.push("/admin/edit");
              }}
            >
              <span>
                <AiFillEdit size={"3rem"} color="#333333" />
              </span>
              <span style={{ marginTop: "-6px" }}>Edits</span>
            </Button>
            <Button
              look="blank"
              onClick={() => {
                Router.push("/admin/seller");
              }}
            >
              <span>
                <AiFillDollarCircle size={"3rem"} color="#333333" />
              </span>
              <span style={{ marginTop: "-6px" }}>Seller</span>
            </Button>
            <Button
              look="blank"
              onClick={() => {
                Router.push("/admin/customers");
              }}
            >
              <span>
                <BiHappyBeaming size={"3rem"} color="#333333" />
              </span>
              <span style={{ marginTop: "-6px" }}>Customer</span>
            </Button>
            <Button
              look="blank"
              onClick={() => {
                Router.push("/admin/orders");
              }}
            >
              <span>
                <FiPackage size={"3rem"} color="#333333" />
              </span>
              <span style={{ marginTop: "-6px" }}>Orders</span>
            </Button>
            <Button
              look="blank"
              onClick={() => {
                Router.push("/admin/account");
              }}
            >
              <span>
                <RiAccountCircleFill size={"3rem"} color="#333333" />
              </span>
              <span style={{ marginTop: "-6px" }}>Account</span>
            </Button>
          </div>
          <div className={styles.logoutBtn}>
            <Button look="filled" color="error">
              LOGOUT
            </Button>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <div style={{ marginTop: "10px" }}>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
