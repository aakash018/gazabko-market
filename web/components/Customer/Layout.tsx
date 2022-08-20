import React from "react";
import Banner from "./Banner";
import CatogriesSideBar from "./CatogriesSideBar";
import CustomerNav from "./CustomerNav";

import styles from "../../styles/components/Customer/CustomerLayout.module.scss";
import Footer from "../shared/Customer/Footer";

interface Props {
  children: React.ReactNode;
  sidebar: "show" | "hide" | "clickable";
  type?: "catogry" | "search" | "catogryPage";
  showFooter?: boolean;
}

const Layout: React.FC<Props> = ({
  children,
  sidebar,
  type = "catogry",
  showFooter = true,
}) => {
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
      {showFooter && (
        <>
          <Footer />
          <div className={styles.copyright}>
            © 2021 Gazabkomarket. All Rights Reserved
          </div>
        </>
      )}
    </>
  );
};

export default Layout;
