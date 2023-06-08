import React, { useRef, useState } from "react";
import styles from "../../../styles/components/shared/Customer/SearchBar.module.scss";
import { BsSearch } from "react-icons/bs";
import Router from "next/router";
import SearchBarCategoriesSelector from "./SearchBarCategoriesSelector";
import { Category } from "../../../@types/global";

interface Props {
  categries: Category[];
}

const SearchBarCustomer: React.FC<Props> = ({ categries }) => {
  const searchInput = useRef<HTMLInputElement>(null);
  const [selectedCat, setSelectedCat] = useState<string>("All Categories");
  const [showOutline, setShowOutline] = useState(false);

  const search = () => {
    if (
      searchInput.current?.value.trim() !== "" &&
      searchInput.current?.value
    ) {
      Router.push(
        `/search/${encodeURIComponent(
          selectedCat
        )}?parameter=${encodeURIComponent(searchInput.current?.value)}`
      );
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <>
      <div
        className={styles.searchBar}
        style={{
          display: "flex",
          alignItems: "center",
          borderRadius: "10px",
          outline: `${showOutline ? "2px solid #1a9cb7" : "none"}`,
        }}
        onFocus={() => setShowOutline(true)}
        onBlur={() => setShowOutline(false)}
      >
        <SearchBarCategoriesSelector
          height="40px"
          categories={categries}
          setCategory={setSelectedCat}
        />
        <div style={{ height: "40px", display: "flex" }}>
          <input
            style={{
              height: "40px",

              outline: "none",
              border: "none",
              textIndent: "10px",
            }}
            ref={searchInput}
            onKeyDown={handleSearch}
            type="text"
            placeholder="Search for products or brands..."
          />
          <button
            style={{
              width: "40px",
              height: "40px",
              borderBottomRightRadius: "10px",
              borderTopRightRadius: "10px",
            }}
            type="submit"
            onClick={search}
          >
            <BsSearch color="white" />
          </button>
        </div>
      </div>
      {showOutline ? (
        <div
          style={{
            position: "fixed",
            top: "100px",
            left: 0,
            height: `${Math.max(
              document.body.scrollHeight,
              document.body.offsetHeight,
              document.body.clientHeight,
              document.body.scrollHeight,
              document.body.offsetHeight
            )}px`,
            width: "100%",
            background: "rgba(0,0,0,0.5)",
            zIndex: 100,
          }}
        ></div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchBarCustomer;
