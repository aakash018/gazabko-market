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
        <div
          onMouseEnter={showSubCat}
          onMouseLeave={hideSubCat}
          className={styles.catHolder}
        >
          <Button onClick={handleSubNavigate} look="blank">
            <span>
              <GiAmpleDress size={"25px"} className={styles.catogryIcon} />
            </span>
            <span className={styles.catText}>Women's Fassion</span>
          </Button>
        </div>
        <div
          onMouseEnter={showSubCat}
          onMouseLeave={hideSubCat}
          className={styles.catHolder}
        >
          <Button onClick={handleSubNavigate} look="blank">
            <span>
              <FaTshirt size={"25px"} className={styles.catogryIcon} />
            </span>
            <span className={styles.catText}>Men's Fassion</span>
          </Button>
        </div>
        <div
          onMouseEnter={showSubCat}
          onMouseLeave={hideSubCat}
          className={styles.catHolder}
        >
          <Button onClick={handleSubNavigate} look="blank">
            <span>
              <FaFan size={"25px"} className={styles.catogryIcon} />
            </span>
            <span className={styles.catText}>Babies & Toys</span>
          </Button>
        </div>
        <div
          onMouseEnter={showSubCat}
          onMouseLeave={hideSubCat}
          className={styles.catHolder}
        >
          <Button onClick={handleSubNavigate} look="blank">
            <span>
              <RiComputerFill size={"25px"} className={styles.catogryIcon} />
            </span>
            <span className={styles.catText}>Electronic Devices</span>
          </Button>
        </div>
        <div
          onMouseEnter={showSubCat}
          onMouseLeave={hideSubCat}
          className={styles.catHolder}
        >
          <Button onClick={handleSubNavigate} look="blank">
            <span>
              <FaHeartbeat size={"25px"} className={styles.catogryIcon} />
            </span>
            <span className={styles.catText}>Health & Fitness</span>
          </Button>
        </div>
        <div
          onMouseEnter={showSubCat}
          onMouseLeave={hideSubCat}
          className={styles.catHolder}
        >
          <Button onClick={handleSubNavigate} look="blank">
            <span>
              <IoMdBeer size={"25px"} className={styles.catogryIcon} />
            </span>
            <span className={styles.catText}>Gazabko Bar</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Catogries;
