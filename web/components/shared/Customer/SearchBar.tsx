import React, { useRef } from "react";
import styles from "../../../styles/components/shared/Customer/SearchBar.module.scss";
import { BsSearch } from "react-icons/bs";
import Router from "next/router";
import CategoriesHolderMenu from "../../Customer/CategoriesHolderMenu";

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
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div style={{ border: "1px solid #888", padding: "2px 5px" }}>
        <CategoriesHolderMenu />
      </div>
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
    </div>
  );
};

export default SearchBarCustomer;
