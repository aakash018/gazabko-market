import React from "react";
import styles from "../../../styles/components/shared/Customer/CatogriesBtn.module.scss";
import { AiOutlineUnorderedList } from "react-icons/ai";

interface Props {
  onClick: () => any;
}

const CatogriesBtn: React.FC<Props> = ({ onClick }) => {
  return (
    <div className={styles.ctgBox} onClick={onClick}>
      <section className={styles.icon}>
        <AiOutlineUnorderedList />
      </section>
      <section className={styles.text}>Catogries</section>
    </div>
  );
};

export default CatogriesBtn;
