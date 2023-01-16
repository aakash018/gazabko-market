import axios from "axios";
import Router from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Order } from "../../../@types/global";
import OrderingInfo from "../../../components/Admin/OrderingInfo";
import SellerNav from "../../../components/Seller/SellerNav";

import styles from "../../../styles/components/Seller/pages/OrdersPage.module.scss";
import { TableHolder } from "../../admin/orders";

interface TableDef {
  SN: number;
  Product: string;
  Quantity: number;
  "Order No": number;
  Status: "pending" | "processing" | "delivered";
  Size: string | undefined;
  Color: string;
}

const OrdersPage = () => {
  const recentOrdSearchRef = useRef<HTMLInputElement>(null);
  const allOrdSearchRef = useRef<HTMLInputElement>(null);
  const caancledOrdSearchRef = useRef<HTMLInputElement>(null);

  const [rowData, setRowData] = useState<TableDef[]>([]);

  const [columnDefs] = useState([
    { field: "SN", width: 60 },
    { field: "Product" },
    { field: "Quantity", width: 150 },
    { field: "Order No" },
    { field: "Size" },
    { field: "Color" },
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

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      (async () => {
        const res = await axios.get<RespondType & { orders?: Order[] }>(
          `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/sellerOrder/recentOrders`,
          { withCredentials: true }
        );
        if (res.data.status === "ok" && res.data.orders) {
          const recentOrderRowData: TableDef[] = res.data.orders.map(
            (order, i) => ({
              SN: i,
              Product: order.product!.name,
              "Order No": order.id,
              Status: order.status,
              Quantity: order.quantity,
              Size: order.size,
              Color: order.color,
            })
          );
          setRowData(recentOrderRowData);
        }
      })();
    }
  }, []);

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
            cancledClick={() => {
              Router.push("/seller/orders/cancledOrders");
            }}
          />
        </div>
        <div className={styles.tables}>
          <TableHolder
            inputRef={recentOrdSearchRef}
            title="Recent Orders"
            columData={columnDefs}
            rowData={rowData}
            onRowClick={(e) => {
              Router.push(`/seller/orders/id?oid=${e.data["Order No"]}`);
            }}
          />
          <TableHolder
            inputRef={allOrdSearchRef}
            title="All Orders"
            columData={columnDefs}
            rowData={rowData}
            onRowClick={(e) => {
              Router.push(`/seller/orders/id?oid=${e.data["Order No"]}`);
            }}
          />
          <TableHolder
            inputRef={caancledOrdSearchRef}
            title="Cancled Orders"
            columData={columnDefs}
            rowData={rowData}
            onRowClick={(e) => {
              Router.push(`/seller/orders/${e.data["Order No"]}`);
            }}
          />
          <TableHolder
            inputRef={caancledOrdSearchRef}
            title="Returned Orders"
            columData={columnDefs}
            rowData={rowData}
            onRowClick={(e) => {
              Router.push(`/seller/orders/id?oid=${e.data["Order No"]}`);
            }}
          />
        </div>
      </div>
    </SellerNav>
  );
};

export default OrdersPage;
