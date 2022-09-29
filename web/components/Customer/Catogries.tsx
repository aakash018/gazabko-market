import React, { useRef } from "react";
import Button from "../shared/Button";
import styles from "../../styles/components/Customer/Catogries.module.scss";

import { GiAmpleDress } from "react-icons/gi";
import { FaTshirt } from "react-icons/fa";
import { FaFan } from "react-icons/fa";
import { RiComputerFill } from "react-icons/ri";
import { FaHeartbeat } from "react-icons/fa";
import { IoMdBeer } from "react-icons/io";
import SubCatogries from "./SubCatogries";
import Router from "next/router";
import CatogriesHolder from "../shared/Customer/CatogriesHolder";

const Catogries: React.FC = () => {
  const subCatRef = useRef<HTMLDivElement>(null);

  const showSubCat = () => {
    subCatRef.current!.style.display = "block";
  };

  const hideSubCat = () => {
    subCatRef.current!.style.display = "none";
  };

  //TODO Change to LINK
  const handleSubNavigate = () => {
    Router.push("/catogries/54g5744ffdd");
  };

  return (
    <div className={styles.catogriesMain}>
      <div
        onMouseEnter={showSubCat}
        onMouseLeave={hideSubCat}
        className={styles.subcat}
        ref={subCatRef}
      >
        <SubCatogries />
      </div>
      <div className={styles.catContainer}>
        <CatogriesHolder name="Women's Fassion">
          <GiAmpleDress size={"25px"} className={styles.catogryIcon} />
        </CatogriesHolder>
        <CatogriesHolder name="Men's Fassion">
          <FaTshirt size={"25px"} className={styles.catogryIcon} />
        </CatogriesHolder>
        <CatogriesHolder name="Babies & Toys">
          <FaFan size={"25px"} className={styles.catogryIcon} />
        </CatogriesHolder>
        <CatogriesHolder name="Electronic Devices">
          <RiComputerFill size={"25px"} className={styles.catogryIcon} />
        </CatogriesHolder>
        <CatogriesHolder name="Health & Fitness">
          <FaHeartbeat size={"25px"} className={styles.catogryIcon} />
        </CatogriesHolder>
        <CatogriesHolder name="Gazabko Bar">
          <IoMdBeer size={"25px"} className={styles.catogryIcon} />
        </CatogriesHolder>
      </div>
    </div>
  );
};

export default Catogries;
