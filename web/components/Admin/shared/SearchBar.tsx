import React, { useRef } from "react";
import { IoMdSearch } from "react-icons/io";
import styles from "../../../styles/components/Admin/SearchBar.module.scss";
import IntputField from "../../shared/Input";

interface Props {
  inputRef: React.LegacyRef<HTMLInputElement>;
}

const SearchBar: React.FC<Props> = ({ inputRef }) => {
  return (
    <div className={styles.searchBar}>
      <div className={styles.icon}>
        <IoMdSearch />
      </div>
      <IntputField input={inputRef} placeholder="Search" />
    </div>
  );
};

export default SearchBar;
