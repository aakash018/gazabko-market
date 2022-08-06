import React from "react";
import Banner from "./Banner";
import CatogriesSideBar from "./CatogriesSideBar";
import CustomerNav from "./CustomerNav";

import styles from "../../styles/components/Customer/CustomerLayout.module.scss";

interface Props {
  children: React.ReactNode;
  sidebar: "show" | "hide" | "clickable";
}

const Layout: React.FC<Props> = ({ children, sidebar }) => {
  return (
    <>
      <CustomerNav />
      <div className={styles.mainContainer}>
        <div className={styles.catogriesBarConainer}>
          <CatogriesSideBar sidebar={sidebar} />
        </div>
        <div className={styles.contentContainer}>{children}</div>
      </div>
    </>
  );
};

export default Layout;
