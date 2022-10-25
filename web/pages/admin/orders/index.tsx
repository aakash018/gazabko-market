import React, { useRef, useState } from "react";
import AdminLayout from "../../../components/Admin/AdminNav";
import OrderingInfo from "../../../components/Admin/OrderingInfo";
import SearchBar from "../../../components/Admin/shared/SearchBar";

import styles from "../../../styles/components/Admin/pages/orders.module.scss";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import Router from "next/router";

interface TableDef {
  SN: number;
  Product: string;
  Buyer: string;
  Quntity: number;
  "Order No": number;
  Status: "Verified" | "Not Verified";
}

interface TableHolderPros {
  inputRef: React.LegacyRef<HTMLInputElement>;
  title: string;
  rowData: TableDef[];
  columData: {}[];
  height?: number;
}

export const TableHolder: React.FC<TableHolderPros> = ({
  inputRef,
  title,
  columData,
  rowData,
  height = 400,
}) => {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.title}>
        <h2>{title}</h2>
      </div>
      <div className={styles.search}>
        <SearchBar inputRef={inputRef} />
      </div>
      <div className={styles.table}>
        <div className="ag-theme-alpine" style={{ height, width: 1010 }}>
          <AgGridReact rowData={rowData} columnDefs={columData}></AgGridReact>
        </div>
      </div>
    </div>
  );
};

const Orders = () => {
  const recentOrdSearchRef = useRef<HTMLInputElement>(null);
  const allOrdSearchRef = useRef<HTMLInputElement>(null);
  const caancledOrdSearchRef = useRef<HTMLInputElement>(null);

  const [rowData] = useState<TableDef[]>([
    {
      SN: 1,
      Product: "A random Product",
      "Order No": 654654646464,
      Buyer: "Laxmi Bhattarai",
      Status: "Verified",
      Quntity: 15,
    },
    {
      SN: 2,
      Product: "A random Product",
      "Order No": 654654646464,
      Buyer: "Laxmi Bhattarai",
      Status: "Verified",
      Quntity: 15,
    },
    {
      SN: 3,
      Product: "A random Product",
      "Order No": 654654646464,
      Buyer: "Laxmi Bhattarai",
      Status: "Verified",
      Quntity: 15,
    },
    {
      SN: 4,
      Product: "A random Product",
      "Order No": 654654646464,
      Buyer: "Laxmi Bhattarai",
      Status: "Verified",
      Quntity: 15,
    },
    {
      SN: 5,
      Product: "A random Product",
      "Order No": 654654646464,
      Buyer: "Laxmi Bhattarai",
      Status: "Verified",
      Quntity: 15,
    },
    {
      SN: 6,
      Product: "A random Product",
      "Order No": 654654646464,
      Buyer: "Laxmi Bhattarai",
      Status: "Verified",
      Quntity: 15,
    },
    {
      SN: 7,
      Product: "A random Product",
      "Order No": 654654646464,
      Buyer: "Laxmi Bhattarai",
      Status: "Verified",
      Quntity: 15,
    },
  ]);

  const [columnDefs] = useState([
    { field: "SN", width: 60 },
    { field: "Product" },
    { field: "Buyer" },
    { field: "Quntity", width: 150 },
    { field: "Order No" },
    {
      field: "Details",
      width: 100,
      cellRenderer: () => (
        <div
          style={{
            color: "var(--theme-color)",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          View
        </div>
      ),
    },
  ]);

  return (
    <AdminLayout>
      <h1>Orders</h1>
      <div className={styles.orders}>
        <div className={styles.infoTabs}>
          <OrderingInfo
            processingClick={() => {
              Router.push("/admin/orders/processing");
            }}
            deliveredClick={() => {
              Router.push("/admin/orders/delivered");
            }}
            pendingClick={() => {
              Router.push("/admin/orders/pending");
            }}
          />
        </div>
        <div className={styles.tables}>
          <TableHolder
            inputRef={recentOrdSearchRef}
            title="Recent Orders"
            columData={columnDefs}
            rowData={rowData}
          />
          <TableHolder
            inputRef={allOrdSearchRef}
            title="All Orders"
            columData={columnDefs}
            rowData={rowData}
          />
          <TableHolder
            inputRef={caancledOrdSearchRef}
            title="Cancled Orders"
            columData={columnDefs}
            rowData={rowData}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Orders;
