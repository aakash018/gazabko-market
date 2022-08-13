import React from "react";
import styles from "../../../styles/components/shared/Customer/SideBarNav.module.scss";

interface Props {
  title: string;
  options: string[];
}

const SideBarNav: React.FC<Props> = ({ title, options }) => {
  return (
    <section className={styles.catToSearchIn}>
      <section className={styles.title}>
        <h1>{title}</h1>
      </section>
      <ul>
        {options.map((option, i) => (
          <li key={i}>{option}</li>
        ))}
      </ul>
    </section>
  );
};

export default SideBarNav;
