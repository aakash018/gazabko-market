import { AgGridReact } from "ag-grid-react";
import React, { useRef, useState } from "react";
import AdminLayout from "../../../components/Admin/AdminNav";
import SearchBar from "../../../components/Admin/shared/SearchBar";

import styles from "../../../styles/components/Admin/pages/DeactivatedVendors.module.scss";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Router from "next/router";

type TableDef = {
  SN: number;
  "Vendor's Name": string;
  "Items Sold": number;
  "Signed Up Date": string;
  "Total Items": number;
  "Deactivted Date": string;
  Details: any;
};

const DeactivatedVendors = () => {
  const searchRef = useRef<HTMLInputElement>(null);

  const [rowData] = useState<TableDef[]>([
    {
      SN: 1,
      "Vendor's Name": "Laxmi Store",
      "Signed Up Date": "27 June 2022",
      "Deactivted Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
    {
      SN: 2,
      "Vendor's Name": "Laxmi Store",
      "Signed Up Date": "27 June 2022",
      "Deactivted Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
    {
      SN: 3,
      "Vendor's Name": "Laxmi Store",
      "Signed Up Date": "27 June 2022",
      "Deactivted Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
    {
      SN: 4,
      "Vendor's Name": "Laxmi Store",
      "Signed Up Date": "27 June 2022",
      "Deactivted Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
    {
      SN: 5,
      "Vendor's Name": "Laxmi Store",
      "Signed Up Date": "27 June 2022",
      "Deactivted Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
  ]);

  const [columnDefs] = useState([
    { field: "SN", width: 60 },
    { field: "Vendor's Name" },
    { field: "Items Sold", width: 140 },
    { field: "Total Items", width: 140 },
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
          onClick={() => Router.push("/admin/seller/diact")}
        >
          View
        </div>
      ),
    },
  ]);

  return (
    <AdminLayout>
      <h1> Deactivated Vendors</h1>
      <div className={styles.deactivatedVendors}>
        <div className={styles.search}>
          <SearchBar inputRef={searchRef} />
        </div>
        <div className={styles.table}>
          <div className="ag-theme-alpine" style={{ height: 280, width: 1050 }}>
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

export default DeactivatedVendors;
