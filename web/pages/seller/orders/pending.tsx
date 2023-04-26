import axios from "axios";
import Router from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Order } from "../../../@types/global";
import SellerLayout from "../../../components/Admin/AdminNav";
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

  const [rowData, setRowData] = useState<TableDef[]>([]);
  const { setAlert } = useAlert();

  const [loading, setLoading] = useState(false);

  const [columnDefs] = useState([
    { field: "SN", width: 60 },
    { field: "Product" },
    { field: "Quantity", width: 150 },
    { field: "Size", width: 70 },
    { field: "Color", width: 90 },
    { field: "Order No" },
    { field: "Details" },
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
                type: "pending",
              },
              withCredentials: true,
            }
          );
          setLoading(false);
          if (res.data.status === "ok" && res.data.orders) {
            const pendingOrders: TableDef[] = res.data.orders.map(
              (order, i) => ({
                SN: i + 1,
                Product: order.product!.name,
                "Order No": order.id,
                Quantity: order.quantity,
                Size: order.size,
                Color: order.color,
                Details: "View",
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
      <h1>Pending Orders</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TableHolder
          inputRef={searchRef}
          title=""
          columData={columnDefs}
          rowData={rowData}
          height={800}
          onCellClicked={(e) => {
            console.log(e.colDef);
            if (e.colDef.field === "Details") {
              Router.push(`/seller/orders/id?oid=${e.data["Order No"]}`);
            }
          }}
        />
      </div>
    </SellerNav>
  );
};

export default Pending;
