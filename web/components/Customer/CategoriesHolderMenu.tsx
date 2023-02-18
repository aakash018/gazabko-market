import { useState } from "react";
import styles from "../../styles/components/Customer/CategoriesHolderMenu.module.scss";
import CategoriesHolder from "../../components/Customer/CategoriesHolder";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { Category } from "../../@types/global";

interface Props {
  categories: Category[];
}

const CategoriesHolderMenu: React.FC<Props> = ({ categories }) => {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <div
      className={styles.categoryHolderMenu}
      onMouseOver={() => setShowCategories(true)}
      onMouseOut={() => setShowCategories(false)}
    >
      <button>
        Categories &nbsp;
        <span>{showCategories ? <AiOutlineUp /> : <AiOutlineDown />}</span>
      </button>

      {showCategories ? (
        <div style={{ position: "absolute", top: "100%" }}>
          <CategoriesHolder categories={categories} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CategoriesHolderMenu;
