import Router from "next/router";
import React, { useRef } from "react";
import { GiAmpleDress } from "react-icons/gi";
import styles from "../../../styles/components/shared/Customer/CatogriesHolder.module.scss";
import SubCatogries from "../../Customer/SubCatogries";
import Button from "../Button";

interface Props {
  name: string;
  children: React.ReactNode;
}

const CatogriesHolder: React.FC<Props> = ({ name, children }) => {
  const subCatRef = useRef<HTMLDivElement>(null);

  const showSubCat = () => {
    subCatRef.current!.style.display = "block";
  };

  const hideSubCat = () => {
    subCatRef.current!.style.display = "none";
  };

  const handleSubNavigate = () => {
    Router.push("/catogries/54g5744ffdd");
  };
  return (
    <div className={styles.catWraper}>
      <div
        onMouseEnter={showSubCat}
        onMouseLeave={hideSubCat}
        className={styles.catHolder}
      >
        <Button onClick={handleSubNavigate} look="blank">
          <span>{children}</span>
          <span className={styles.catText}>{name}</span>
        </Button>
      </div>
      <div
        onMouseEnter={showSubCat}
        onMouseLeave={hideSubCat}
        className={styles.subcat}
        ref={subCatRef}
      >
        <SubCatogries />
      </div>
    </div>
  );
};

export default CatogriesHolder;
