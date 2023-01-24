import axios from "axios";
import Router from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { TableHolder } from ".";
import { Order } from "../../../@types/global";
import AdminLayout from "../../../components/Admin/AdminNav";
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
    { field: "Size" },
    { field: "Color" },
    { field: "Order No" },
    {
      field: "Details",
      cellRenderer: () => (
        <div
          onClick={() => Router.push("/admin/orders/54545465465")}
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
        setLoading(true);
        try {
          const res = await axios.get<
            RespondType & { pendingOrders?: Order[] }
          >(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/orders/getPendingOrders`,
            {
              withCredentials: true,
            }
          );
          setLoading(false);
          if (res.data.status === "ok" && res.data.pendingOrders) {
            const pendingOrders: TableDef[] = res.data.pendingOrders.map(
              (order, i) => ({
                SN: i,
                Product: order.product!.name,
                "Order No": order.id,
                Quantity: order.quantity,
                Size: order.size,
                Color: order.color,
                id: order.id,
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
    <AdminLayout>
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
        />
      </div>
    </AdminLayout>
  );
};

export default Pending;
