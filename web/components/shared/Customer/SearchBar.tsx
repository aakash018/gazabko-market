import React, { useRef } from "react";
import styles from "../../../styles/components/shared/Customer/SearchBar.module.scss";
import { BsSearch } from "react-icons/bs";
import Router from "next/router";

const SearchBarCustomer: React.FC = () => {
  const searchInput = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      if (
        searchInput.current?.value.trim() !== "" &&
        searchInput.current?.value
      ) {
        Router.push(`/search/${searchInput.current?.value}`);
      }
    }
  };

  return (
    <div className={styles.searchBar}>
      <section className={styles.icon}>
        <BsSearch />
      </section>
      <section className={styles.input}>
        <input
          type="text"
          placeholder="Search for products or brands"
          onKeyDown={handleSearch}
          ref={searchInput}
        />
      </section>
    </div>
  );
};

export default SearchBarCustomer;
