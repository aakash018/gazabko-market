import React from "react";
import Banner from "./Banner";
import CatogriesSideBar from "./CatogriesSideBar";
import CustomerNav from "./CustomerNav";

import styles from "../../styles/components/Customer/CustomerLayout.module.scss";

interface Props {
  children: React.ReactNode;
  sidebar: "show" | "hide" | "clickable";
  type?: "catogry" | "search" | "catogryPage";
}

const Layout: React.FC<Props> = ({ children, sidebar, type = "catogry" }) => {
  return (
    <>
      <CustomerNav />
      <div className={styles.mainContainer}>
        <div
          className={`${styles.catogriesBarConainer} ${
            type === "catogry" ? styles.lowMargin : ""
          }`}
        >
          <CatogriesSideBar sidebar={sidebar} type={type} />
        </div>
        <div className={styles.contentContainer}>{children}</div>
      </div>
    </>
  );
};

export default Layout;
