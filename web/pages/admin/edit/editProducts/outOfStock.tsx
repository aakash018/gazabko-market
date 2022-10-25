import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import AdminLayout from "../../../../components/Admin/AdminNav";

import styles from "../../../../styles/components/Admin/pages/outOfStock.module.scss";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Button from "../../../../components/shared/Button";
import Router from "next/router";

type TableDef = {
  SN: number;
  Product: string;
  Vendor: string;
  "Stock ended at": string;
  "View Product": any;
  "View Vendor": any;
};

const OutOfStock = () => {
  const [rowData] = useState<TableDef[]>([
    {
      SN: 1,
      "Stock ended at": "27 June 2022",
      Product: "xyz",
      "View Product": "",
      "View Vendor": "",
      Vendor: "abc",
    },
    {
      SN: 2,
      "Stock ended at": "27 June 2022",
      Product: "xyz",
      "View Product": "",
      "View Vendor": "",
      Vendor: "abc",
    },
    {
      SN: 3,
      "Stock ended at": "27 June 2022",
      Product: "xyz",
      "View Product": "",
      "View Vendor": "",
      Vendor: "abc",
    },
    {
      SN: 4,
      "Stock ended at": "27 June 2022",
      Product: "xyz",
      "View Product": "",
      "View Vendor": "",
      Vendor: "abc",
    },
    {
      SN: 5,
      "Stock ended at": "27 June 2022",
      Product: "xyz",
      "View Product": "",
      "View Vendor": "",
      Vendor: "abc",
    },
    {
      SN: 6,
      "Stock ended at": "27 June 2022",
      Product: "xyz",
      "View Product": "",
      "View Vendor": "",
      Vendor: "abc",
    },
    {
      SN: 7,
      "Stock ended at": "27 June 2022",
      Product: "xyz",
      "View Product": "",
      "View Vendor": "",
      Vendor: "abc",
    },
    {
      SN: 8,
      "Stock ended at": "27 June 2022",
      Product: "xyz",
      "View Product": "",
      "View Vendor": "",
      Vendor: "abc",
    },
    {
      SN: 8,
      "Stock ended at": "27 June 2022",
      Product: "xyz",
      "View Product": "",
      "View Vendor": "",
      Vendor: "abc",
    },
    {
      SN: 9,
      "Stock ended at": "27 June 2022",
      Product: "xyz",
      "View Product": "",
      "View Vendor": "",
      Vendor: "abc",
    },
    {
      SN: 10,
      "Stock ended at": "27 June 2022",
      Product: "xyz",
      "View Product": "",
      "View Vendor": "",
      Vendor: "abc",
    },
  ]);

  const [columnDefs] = useState([
    { field: "SN", width: 60 },
    { field: "Product" },
    { field: "Vendor" },
    { field: "Stock ended at" },
    {
      field: "View Product",
      cellRenderer: () => {
        return (
          <div
            onClick={() => Router.push("/admin/edit/editProducts/5867ds")}
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
    {
      field: "View Vendor",
      width: 170,
      cellRenderer: () => {
        return (
          <div
            onClick={() => Router.push("/admin/seller/dsfsdfds")}
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
    <AdminLayout>
      <div>
        <h1>Products Out of Stock</h1>
      </div>
      <div className={styles.outOfStock}>
        <div className={styles.table}>
          <div
            className="ag-theme-alpine"
            style={{ height: "500px", width: "100%" }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OutOfStock;
