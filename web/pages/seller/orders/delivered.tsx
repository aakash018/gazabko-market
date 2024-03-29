import axios from "axios";
import Router from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Order } from "../../../@types/global";

import AdminLayout from "../../../components/Admin/AdminNav";
import SellerNav from "../../../components/Seller/SellerNav";
import { TableHolder } from "../../admin/orders";
import { useAlert } from "../../_app";

interface TableDef {
  SN: number;
  Product: string;
  Quantity: number;
  "Order No": number;
  Size?: string;
  Color?: string;
}

const Pending: React.FC = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const { setAlert } = useAlert();
  const [rowData, setRowData] = useState<TableDef[]>([]);

  const [columnDefs] = useState([
    { field: "SN", width: 60 },
    { field: "Product" },
    { field: "Quantity", width: 150 },
    { field: "Order No" },
    { field: "Size", width: 70 },
    { field: "Color", width: 80 },
    {
      field: "Details",
      cellRenderer: () => (
        <div
          style={{
            fontWeight: "bold",
            color: "var(--theme-color)",
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
        setLoading(true);
        try {
          const res = await axios.get<RespondType & { orders?: Order[] }>(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/sellerOrder/getOrdersByStatus`,
            {
              params: {
                type: "delivered",
              },
              withCredentials: true,
            }
          );
          setLoading(false);
          if (res.data.status === "ok" && res.data.orders) {
            const pendingOrders: TableDef[] = res.data.orders.map(
              (order, i) => ({
                SN: i,
                Product: order.product!.name,
                "Order No": order.id,
                Quantity: order.quantity,
                Size: order.size,
                Color: order.color,
              })
            );
            setRowData(pendingOrders);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        } catch {
          setAlert({
            type: "error",
            message: "failed to load data",
          });
        }
      })();
    }
  }, []);

  return (
    <SellerNav>
      <h1>Delivered Orders</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {loading && <h2>Loading...</h2>}
        {!loading && (
          <TableHolder
            inputRef={searchRef}
            title=""
            columData={columnDefs}
            rowData={rowData}
            height={800}
            onCellClicked={(event) => {
              if (event.colDef.field === "Details") {
                Router.push(`/seller/orders/id?oid=${event.data["Order No"]}`);
              }
            }}
          />
        )}
      </div>
    </SellerNav>
  );
};

export default Pending;
