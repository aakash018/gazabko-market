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
  Color?: String;
  Size?: String;
  Quantity: number;
  "Order No": number;
}

const Pending: React.FC = () => {
  const searchRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [rowData, setRowData] = useState<TableDef[]>([]);

  const { setAlert } = useAlert();

  const [columnDefs] = useState([
    { field: "SN", width: 60 },
    { field: "Product" },
    { field: "Buyer" },
    { field: "Quantity", width: 150 },
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
            RespondType & { deliveredOrders?: Order[] }
          >(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/orders/getDeliveredOrders`,
            {
              withCredentials: true,
            }
          );
          setLoading(false);
          console.log(res.data);
          if (res.data.status === "ok" && res.data.deliveredOrders) {
            const deliveredOrders: TableDef[] = res.data.deliveredOrders.map(
              (order, i) => ({
                SN: i + 1,
                Product: order.product!.name,
                "Order No": order.id,
                Quantity: order.quantity,
                Size: order.size,
                Color: order.color,
                id: order.id,
              })
            );
            setRowData(deliveredOrders);
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
      <h1>Delivered Orders</h1>
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
            if (e.colDef.field === "Details") {
              Router.push(`/admin/orders/id?oid=${e.data.id}`);
            }
          }}
        />
      </div>
    </AdminLayout>
  );
};

export default Pending;
