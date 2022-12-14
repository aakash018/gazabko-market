import React from "react";
import CustomerNav from "./CustomerNav";

import styles from "../../styles/components/Customer/CustomerLayout.module.scss";
import Footer from "../shared/Customer/Footer";

interface Props {
  children: React.ReactNode;
  sliderCategories?: boolean;
  type?: "catogry" | "search" | "catogryPage";
  showFooter?: boolean;
}

const Layout: React.FC<Props> = ({
  children,
  sliderCategories = true,
  type = "catogry",
  showFooter = true,
}) => {
  return (
    <>
      <CustomerNav sliderCategories={sliderCategories} />
      <div className={styles.mainContainer}>
        <div
          style={{ display: "relative" }}
          className={`${styles.catogriesBarConainer} ${
            type === "catogry" ? styles.lowMargin : ""
          }`}
        ></div>
        <div className={styles.contentWrapper}>
          <div className={styles.contentContainer}>{children}</div>
        </div>
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
