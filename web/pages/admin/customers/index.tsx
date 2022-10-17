import { AgGridReact } from "ag-grid-react";
import React, { useRef, useState } from "react";
import AdminLayout from "../../../components/Admin/AdminNav";
import CustomersInfoHolder from "../../../components/Admin/shared/CustomersInfoHolder";
import SearchBar from "../../../components/Admin/shared/SearchBar";

import styles from "../../../styles/components/Admin/pages/CustomerPage.module.scss";

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

const CustomerPage = () => {
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
  ]);

  const [columnDefs] = useState([
    { field: "SN", width: 60 },
    { field: "Name" },
    { field: "Signed Up Date", width: 150 },
    { field: "Total Items Boughts" },
    { field: "Status", width: 150 },
    { field: "Details", width: 150, cellRenderer: () => <div>View</div> },
  ]);

  return (
    <AdminLayout>
      <h1>Customers</h1>
      <div className={styles.customers}>
        <div className={styles.topShowcase}>
          <div className={styles.topBuyers}>
            <CustomersInfoHolder title="Recently Added Customers" />
          </div>
          <div className={styles.newCusomers}>
            <CustomersInfoHolder title="Top Customers This Month" />
          </div>
        </div>
        <div className={styles.allCustomers}>
          <h2>All Customers</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "fit-content",
              gap: "20px",
            }}
          >
            <div className={styles.search}>
              <SearchBar inputRef={searchRef} />
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
      </div>
    </AdminLayout>
  );
};

export default CustomerPage;
