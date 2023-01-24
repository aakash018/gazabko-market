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
  Color?: string;
  Size?: string;
  "Order No": number;
}

const Pending: React.FC = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [Loading, setLoading] = useState(false);
  const [rowData, setRowData] = useState<TableDef[]>([]);
  const { setAlert } = useAlert();

  const [columnDefs] = useState([
    { field: "SN", width: 60 },
    { field: "Product" },
    { field: "Quantity", width: 100 },
    { field: "Order No", width: 160, resizable: true },
    { field: "Color", width: 100 },
    { field: "Size", width: 100 },
    {
      field: "Details",
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

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      (async () => {
        setLoading(true);
        try {
          const res = await axios.get<
            RespondType & { processingOrders?: Order[] }
          >(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/orders/getProcessingOrders`,
            {
              withCredentials: true,
            }
          );
          setLoading(false);
          console.log(res.data);
          if (res.data.status === "ok" && res.data.processingOrders) {
            const processingOrders: TableDef[] = res.data.processingOrders.map(
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
            setRowData(processingOrders);
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
      <h1>Processing Orders</h1>
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
