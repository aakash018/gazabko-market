import Router from "next/router";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import {
  adminPageSearchData,
  AdminPageSearchDataProps,
} from "../../adminPageSearchData";
import styles from "../../styles/components/Admin/DashSearchBar.module.scss";
import IntputField from "../shared/Input";

const DashSearchBar = () => {
  const [matchedSug, setMatchedSug] = useState<AdminPageSearchDataProps[]>([]);

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let matches: AdminPageSearchDataProps[] = [];
    if (e.target.value.trim().length > 0) {
      matches = adminPageSearchData.filter((ele) => {
        const regex = new RegExp(`${e.target.value}`, "gi");
        return ele.name.match(regex);
      });
    }
    setMatchedSug(matches);
  };

  return (
    <div className={styles.dashSearchBar}>
      <div className={styles.input}>
        <div className={styles.intputField}>
          <IntputField
            placeholder="Search Settings"
            onChange={(e) => handelChange(e)}
            onBlur={() => {
              setTimeout(() => {
                setMatchedSug([]);
              }, 200);
            }}
          />
        </div>
        <div className={styles.icon}>
          <BiSearch />
        </div>
      </div>
      <div className={styles.sugBox}>
        <ul>
          {matchedSug.map((ele, i) => {
            if (i <= 7) {
              return (
                <li
                  key={i}
                  onClick={() => {
                    Router.push(ele.url);
                  }}
                  style={{
                    fontWeight: `${ele.bold ? "bold" : ""}`,
                  }}
                >
                  {ele.name}
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default DashSearchBar;
