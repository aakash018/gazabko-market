import React from "react";
import styles from "../../styles/components/Admin/AdminNav.module.scss";
import Image from "next/image";
import Button from "../shared/Button";
import { MdSpaceDashboard } from "react-icons/md";
import { AiFillDollarCircle, AiFillEdit } from "react-icons/ai";
import { BiHappyBeaming } from "react-icons/bi";
import { RiAccountCircleFill } from "react-icons/ri";

import { FiPackage } from "react-icons/fi";
import Router from "next/router";

interface Props {
  children: React.ReactNode;
}

const AdminLayout: React.FC<Props> = ({ children }) => {
  return (
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
          <Button look="blank">
            <span>
              <AiFillDollarCircle size={"3rem"} color="#333333" />
            </span>
            <span style={{ marginTop: "-6px" }}>Seller</span>
          </Button>
          <Button look="blank">
            <span>
              <BiHappyBeaming size={"3rem"} color="#333333" />
            </span>
            <span style={{ marginTop: "-6px" }}>Customer</span>
          </Button>
          <Button look="blank">
            <span>
              <FiPackage size={"3rem"} color="#333333" />
            </span>
            <span style={{ marginTop: "-6px" }}>Orders</span>
          </Button>
          <Button look="blank">
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
          <div className={styles.container}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
