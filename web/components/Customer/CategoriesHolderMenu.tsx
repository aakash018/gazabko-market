import { useState } from "react";
import styles from "../../styles/components/Customer/CategoriesHolderMenu.module.scss";
import CategoriesHolder from "../../components/Customer/CategoriesHolder";

const CategoriesHolderMenu = () => {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <div className={styles.categoryHolderMenu} onMouseOver={() => setShowCategories(true)} onMouseOut={() => setShowCategories(false)}>
      <button>
        Categories &nbsp;
        <span>{showCategories ? "^" : "v"}</span>
      </button>

      {showCategories ?
        <div style={{ position: "absolute", top: "100%" }}>
          <CategoriesHolder />
        </div> : <></>}
    </div>

  );
};

export default CategoriesHolderMenu;
