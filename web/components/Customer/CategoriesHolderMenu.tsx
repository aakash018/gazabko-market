import { useState } from "react";
import styles from "../../styles/components/Customer/CategoriesHolderMenu.module.scss";
import CategoriesHolder from "../../components/Customer/CategoriesHolder";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const CategoriesHolderMenu = () => {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <div className={styles.categoryHolderMenu} onMouseOver={() => setShowCategories(true)} onMouseOut={() => setShowCategories(false)}>
      <button>
        Categories &nbsp;
        <span>{showCategories ? <AiOutlineUp /> : <AiOutlineDown />}</span>
      </button>

      {showCategories ?
        <div style={{ position: "absolute", top: "100%" }}>
          <CategoriesHolder />
        </div> : <></>}
    </div>

  );
};

export default CategoriesHolderMenu;
