import React from "react";
import styles from "../../../styles/components/shared/Customer/SearchBar.module.scss";
import { BsSearch } from "react-icons/bs";

const SearchBarCustomer: React.FC = () => {
  return (
    <div className={styles.searchBar}>
      <section className={styles.icon}>
        <BsSearch />
      </section>
      <section className={styles.input}>
        <input type="text" placeholder="Search for products or brands" />
      </section>
    </div>
  );
};

export default SearchBarCustomer;
