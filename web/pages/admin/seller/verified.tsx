import { AgGridReact } from "ag-grid-react";
import React, { useRef, useState } from "react";
import AdminLayout from "../../../components/Admin/AdminNav";
import SearchBar from "../../../components/Admin/shared/SearchBar";

import styles from "../../../styles/components/Admin/pages/VerifiedSellers.module.scss";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Router from "next/router";

type TableDef = {
  SN: number;
  "Vendor's Name": string;
  "Items Sold": number;
  "Signed Up Date": string;
  "Total Items": number;
  Details: any;
};

const Verified = () => {
  const searchInput = useRef<HTMLInputElement>(null);

  const [rowData] = useState<TableDef[]>([
    {
      SN: 1,
      "Vendor's Name": "Laxmi Store",
      "Signed Up Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
    {
      SN: 2,
      "Vendor's Name": "Laxmi Store",
      "Signed Up Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
    {
      SN: 3,
      "Vendor's Name": "Laxmi Store",
      "Signed Up Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
    {
      SN: 4,
      "Vendor's Name": "Laxmi Store",
      "Signed Up Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
    {
      SN: 5,
      "Vendor's Name": "Laxmi Store",
      "Signed Up Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
    {
      SN: 6,
      "Vendor's Name": "Laxmi Store",
      "Signed Up Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
    {
      SN: 7,
      "Vendor's Name": "Laxmi Store",
      "Signed Up Date": "27 June 2022",
      "Items Sold": 20,
      "Total Items": 40,
      Details: "",
    },
    {
      SN: 8,
      "Vendor's Name": "Laxmi Store",
      "Signed Up Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
    {
      SN: 9,
      "Vendor's Name": "Laxmi Store",
      "Signed Up Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
    {
      SN: 10,
      "Vendor's Name": "Laxmi Store",
      "Signed Up Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
    {
      SN: 11,
      "Vendor's Name": "Laxmi Store",
      "Signed Up Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
    {
      SN: 12,
      "Vendor's Name": "Laxmi Store",
      "Signed Up Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
    {
      SN: 13,
      "Vendor's Name": "Laxmi Store",
      "Signed Up Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
    {
      SN: 14,
      "Vendor's Name": "Laxmi Store",
      "Signed Up Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
    {
      SN: 15,
      "Vendor's Name": "Laxmi Store",
      "Signed Up Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
    {
      SN: 16,
      "Vendor's Name": "Laxmi Store",
      "Signed Up Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
    {
      SN: 17,
      "Vendor's Name": "Laxmi Store",
      "Signed Up Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
    {
      SN: 18,
      "Vendor's Name": "Laxmi Store",
      "Signed Up Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
    {
      SN: 19,
      "Vendor's Name": "Laxmi Store",
      "Signed Up Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
    {
      SN: 20,
      "Vendor's Name": "Laxmi Store",
      "Signed Up Date": "27 June 2022",
      "Total Items": 40,
      "Items Sold": 20,
      Details: "",
    },
    {
      SN: 21,
      "Vendor's Name": "Laxmi Store",
      "Signed Up Date": "27 June 2022",
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
          onClick={() => Router.push("/admin/seller/laxmi-store")}
        >
          View
        </div>
      ),
    },
  ]);

  return (
    <AdminLayout>
      <div>
        <h1>Verified Sellers</h1>
      </div>
      <div className={styles.verifiedSellers}>
        <div className={styles.content}>
          <div className={styles.search}>
            <SearchBar inputRef={searchInput} />
          </div>
          <div className={styles.table}>
            <div
              className="ag-theme-alpine"
              style={{ height: 950, width: 850 }}
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

export default Verified;
