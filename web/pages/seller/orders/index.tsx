import Router from "next/router";
import React, { useRef, useState } from "react";
import OrderingInfo from "../../../components/Admin/OrderingInfo";
import SellerNav from "../../../components/Seller/SellerNav";

import styles from "../../../styles/components/Seller/pages/OrdersPage.module.scss";
import { TableHolder } from "../../admin/orders";

interface TableDef {
  SN: number;
  Product: string;
  Buyer: string;
  Quntity: number;
  "Order No": number;
  Status: "Verified" | "Not Verified";
}

const OrdersPage = () => {
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
          onClick={() => Router.push("/seller/orders/54545465465")}
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
    <SellerNav>
      <h1>Orders</h1>
      <div className={styles.orders}>
        <div className={styles.infoTabs}>
          <OrderingInfo
            processingClick={() => {
              Router.push("/seller/orders/processing");
            }}
            deliveredClick={() => {
              Router.push("/seller/orders/delivered");
            }}
            pendingClick={() => {
              Router.push("/seller/orders/pending");
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
          <TableHolder
            inputRef={caancledOrdSearchRef}
            title="Returned Orders"
            columData={columnDefs}
            rowData={rowData}
          />
        </div>
      </div>
    </SellerNav>
  );
};

export default OrdersPage;
