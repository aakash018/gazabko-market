import { AgGridReact } from "ag-grid-react";
import Router from "next/router";
import React, { useRef, useState } from "react";
import AdminLayout from "../../../components/Admin/AdminNav";
import SearchBar from "../../../components/Admin/shared/SearchBar";

import styles from "../../../styles/components/Admin/pages/NewCustomers.module.scss";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

type TableDef = {
  SN: number;
  Name: string;
  "Signed Up Date": string;
  "Total Items Boughts": number;
  Status: "Verified" | "Not Verified";
  Details: any;
};

const newCustomers = () => {
  const searchRef = useRef<HTMLInputElement>(null);

  const [rowData] = useState<TableDef[]>([
    {
      SN: 1,
      "Signed Up Date": "21 Feb 2022",
      Name: "Laxmi Bhattarai",
      "Total Items Boughts": 20,
      Details: "",
      Status: "Verified",
    },
    {
      SN: 2,
      "Signed Up Date": "21 Feb 2022",
      Name: "Laxmi Bhattarai",
      "Total Items Boughts": 20,
      Details: "",
      Status: "Verified",
    },
    {
      SN: 3,
      "Signed Up Date": "21 Feb 2022",
      Name: "Laxmi Bhattarai",
      "Total Items Boughts": 20,
      Details: "",
      Status: "Verified",
    },
    {
      SN: 4,
      "Signed Up Date": "21 Feb 2022",
      Name: "Laxmi Bhattarai",
      "Total Items Boughts": 20,
      Details: "",
      Status: "Verified",
    },
    {
      SN: 5,
      "Signed Up Date": "21 Feb 2022",
      Name: "Laxmi Bhattarai",
      "Total Items Boughts": 20,
      Details: "",
      Status: "Verified",
    },
  ]);

  const [columnDefs] = useState([
    { field: "SN", width: 60 },
    { field: "Name" },
    { field: "Signed Up Date", width: 150 },
    { field: "Total Items Boughts" },
    { field: "Status", width: 150 },
    {
      field: "Details",
      width: 150,
      cellRenderer: () => (
        <div
          style={{
            fontWeight: "bold",
            color: "#5494F5",
          }}
          onClick={() => {
            Router.push("/admin/customers/sdad");
          }}
        >
          View
        </div>
      ),
    },
  ]);

  return (
    <AdminLayout>
      <h1>New Customers</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <div className={styles.topCustomers}>
          <div className={styles.contentHeader}>
            <div className={styles.search}>
              <SearchBar inputRef={searchRef} />
            </div>
          </div>
          <div className={styles.tables}>
            <div
              className="ag-theme-alpine"
              style={{ height: 400, width: 920 }}
            >
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
              ></AgGridReact>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default newCustomers;
