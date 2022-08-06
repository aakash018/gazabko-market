import React, { useRef, useState } from "react";
import CatogriesBtn from "../shared/Customer/CatogriesBtn";
import styles from "../../styles/components/Customer/CatogriesSideBar.module.scss";
import Catogries from "./Catogries";

interface Props {
  sidebar: "show" | "hide" | "clickable";
}

const CatogriesSideBar: React.FC<Props> = ({ sidebar }) => {
  const [showCat, setShowCat] = useState(sidebar === "show" ? true : false);

  const handleShowCat = () => {
    console.log("YO");
    setShowCat((prev) => !prev);
  };

  return (
    <div className={styles.ctg}>
      <CatogriesBtn onClick={handleShowCat} />
      <div className={showCat ? `${styles.showCat}` : `${styles.hideCat}`}>
        <Catogries />
      </div>
    </div>
  );
};

export default CatogriesSideBar;
