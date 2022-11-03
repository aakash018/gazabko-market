import { AgGridReact } from "ag-grid-react";
import Router from "next/router";
import React, { useRef, useState } from "react";
import SellerNav from "../../../components/Seller/SellerNav";
import Button from "../../../components/shared/Button";

import styles from "../../../styles/components/Seller/pages/OutOfStock.module.scss";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import SearchBar from "../../../components/Admin/shared/SearchBar";
type TableDef = {
  SN: number;
  Product: string;
  "Stock ended at": string;
  "View Product": any;
  "Last Stocked at": any;
};

const OutOfStock = () => {
  const searchRef = useRef<HTMLInputElement>(null);

  const [rowData] = useState<TableDef[]>([
    {
      SN: 1,
      "Stock ended at": "27 June 2022",
      Product: "xyz",
      "View Product": "",
      "Last Stocked at": "22 Juny 2022",
    },
    {
      SN: 2,
      "Stock ended at": "27 June 2022",
      Product: "xyz",
      "View Product": "",
      "Last Stocked at": "22 Juny 2022",
    },
    {
      SN: 3,
      "Stock ended at": "27 June 2022",
      Product: "xyz",
      "View Product": "",
      "Last Stocked at": "22 Juny 2022",
    },
    {
      SN: 4,
      "Stock ended at": "27 June 2022",
      Product: "xyz",
      "View Product": "",
      "Last Stocked at": "22 Juny 2022",
    },
    {
      SN: 5,
      "Stock ended at": "27 June 2022",
      Product: "xyz",
      "View Product": "",
      "Last Stocked at": "22 Juny 2022",
    },
    {
      SN: 6,
      "Stock ended at": "27 June 2022",
      Product: "xyz",
      "View Product": "",
      "Last Stocked at": "22 Juny 2022",
    },
    {
      SN: 7,
      "Stock ended at": "27 June 2022",
      Product: "xyz",
      "View Product": "",
      "Last Stocked at": "22 Juny 2022",
    },
    {
      SN: 8,
      "Stock ended at": "27 June 2022",
      Product: "xyz",
      "View Product": "",
      "Last Stocked at": "22 Juny 2022",
    },
    {
      SN: 8,
      "Stock ended at": "27 June 2022",
      Product: "xyz",
      "View Product": "",
      "Last Stocked at": "22 Juny 2022",
    },
    {
      SN: 9,
      "Stock ended at": "27 June 2022",
      Product: "xyz",
      "View Product": "",
      "Last Stocked at": "22 Juny 2022",
    },
    {
      SN: 10,
      "Stock ended at": "27 June 2022",
      Product: "xyz",
      "View Product": "",
      "Last Stocked at": "22 Juny 2022",
    },
  ]);

  const [columnDefs] = useState([
    { field: "SN", width: 60 },
    { field: "Product" },
    { field: "Last Stocked at" },
    { field: "Stock ended at" },
    {
      field: "View Product",
      cellRenderer: () => {
        return (
          <div
            onClick={() => Router.push("/seller/products/dfsfd")}
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Button>View</Button>
          </div>
        );
      },
    },
  ]);

  return (
    <SellerNav>
      <div>
        <h1>Products Out of Stock</h1>
      </div>
      <div className={styles.outOfStock}>
        <div className={styles.tableContainer}>
          <div className={styles.table}>
            <div className={styles.search}>
              <SearchBar inputRef={searchRef} />
            </div>
            <div
              className="ag-theme-alpine"
              style={{ height: "550px", width: 870 }}
            >
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
              ></AgGridReact>
            </div>
          </div>
        </div>
      </div>
    </SellerNav>
  );
};

export default OutOfStock;
