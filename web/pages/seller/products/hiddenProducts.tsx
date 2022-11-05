import { AgGridReact } from "ag-grid-react";
import Router from "next/router";
import React, { useRef, useState } from "react";
import SearchBar from "../../../components/Admin/shared/SearchBar";
import SellerNav from "../../../components/Seller/SellerNav";

import styles from "../../../styles/components/Seller/pages/HiddenProducts.module.scss";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

type TableDef = {
  SN: number;
  "Product's Name": string;
  "Items Sold": number;
  "Signed Up Date": string;
  "Total Items": number;
  "Deactivted Date": string;
  Details: any;
};

const HiddenProducts = () => {
  const searchRef = useRef<HTMLInputElement>(null);

  const [rowData] = useState<TableDef[]>([
    {
      SN: 1,
      "Product's Name":
        "Sweet Sweat Waist Trimming Abdomen Hot Body Slimming Belt",
      "Signed Up Date": "27 June 2022",
      "Deactivted Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
    {
      SN: 2,
      "Product's Name":
        "Sweet Sweat Waist Trimming Abdomen Hot Body Slimming Belt",
      "Signed Up Date": "27 June 2022",
      "Deactivted Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
    {
      SN: 3,
      "Product's Name":
        "Sweet Sweat Waist Trimming Abdomen Hot Body Slimming Belt",
      "Signed Up Date": "27 June 2022",
      "Deactivted Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
    {
      SN: 4,
      "Product's Name":
        "Sweet Sweat Waist Trimming Abdomen Hot Body Slimming Belt",
      "Signed Up Date": "27 June 2022",
      "Deactivted Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
    {
      SN: 5,
      "Product's Name":
        "Sweet Sweat Waist Trimming Abdomen Hot Body Slimming Belt",
      "Signed Up Date": "27 June 2022",
      "Deactivted Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
  ]);

  const [columnDefs] = useState([
    { field: "SN", width: 60 },
    { field: "Product's Name", resizable: true },
    { field: "Items Sold", width: 140 },
    { field: "Signed Up Date" },
    { field: "Deactivted Date" },
    {
      field: "Details",
      width: 100,
      cellRenderer: () => (
        <div
          style={{
            color: "#5494F5",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={() => Router.push("/seller/products/diact")}
        >
          View
        </div>
      ),
    },
  ]);

  return (
    <SellerNav>
      <h1>Hidden Products</h1>
      <div className={styles.hiddenProducts}>
        <div className={styles.tableContainer}>
          <div className={styles.search}>
            <SearchBar inputRef={searchRef} />
          </div>
          <div className={styles.table}>
            <div className={styles.table}>
              <div
                className="ag-theme-alpine"
                style={{ height: 280, width: 902 }}
              >
                <AgGridReact
                  rowData={rowData}
                  columnDefs={columnDefs}
                ></AgGridReact>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SellerNav>
  );
};

export default HiddenProducts;
