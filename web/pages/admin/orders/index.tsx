import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/Admin/AdminNav";
import OrderingInfo from "../../../components/Admin/OrderingInfo";
import SearchBar from "../../../components/Admin/shared/SearchBar";

import styles from "../../../styles/components/Admin/pages/orders.module.scss";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import Router from "next/router";
import { CellClickedEvent, RowClickedEvent } from "ag-grid-community";
import axios from "axios";
import { useAlert } from "../../_app";
import { Order } from "../../../@types/global";
import Quantity from "../../../components/shared/Customer/Quantity";

interface TableDef {
  SN: number;
  Product: string;
  Buyer: string;
  Quntity: number;
  "Order No": number;
  Status: string;
  id: number;
}

interface TableHolderPros {
  inputRef: React.LegacyRef<HTMLInputElement>;
  title: string;
  rowData: any[];
  columData: {}[];
  height?: number;
  width?: number;
  onRowClick?: (event: RowClickedEvent<any>) => void;
  onCellClicked?: (event: CellClickedEvent) => void;
}

export const TableHolder: React.FC<TableHolderPros> = ({
  inputRef,
  title,
  columData,
  rowData,
  height = 400,
  width = 915,
  onRowClick,
  onCellClicked,
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
        <div className="ag-theme-alpine" style={{ height, width }}>
          <AgGridReact
            onRowClicked={(event) => {
              if (onRowClick) {
                onRowClick(event);
              }
            }}
            rowData={rowData}
            columnDefs={columData}
            onCellClicked={(e: CellClickedEvent) => {
              if (onCellClicked) {
                onCellClicked(e);
              }
            }}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

const Orders = () => {
  const recentOrdSearchRef = useRef<HTMLInputElement>(null);
  const allOrdSearchRef = useRef<HTMLInputElement>(null);
  const caancledOrdSearchRef = useRef<HTMLInputElement>(null);
  const { setAlert } = useAlert();

  const [countLoading, setCountLoading] = useState(false);

  const [ordersCount, setOrdersCount] = useState<{
    pending: number;
    processing: number;
    delivered: number;
    returned: number;
  } | null>(null);

  const [rowData, setRowData] = useState<TableDef[]>([]);

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

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      (async () => {
        try {
          setCountLoading(true);
          const res = await axios.get<
            RespondType & {
              counts?: {
                pending: number;
                processing: number;
                delivered: number;
                returned: number;
              };
            }
          >(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/getCounts/getOrdersCount`,
            { withCredentials: true }
          );
          setCountLoading(false);

          if (res.data.status === "ok" && res.data.counts) {
            setOrdersCount(res.data.counts);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        } catch {
          setAlert({
            type: "error",
            message: "failed to load orders count",
          });
        }
      })();

      (async () => {
        try {
          const res = await axios.get<RespondType & { recentOrders?: Order[] }>(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/orders/getRecentOrders`,
            { withCredentials: true }
          );

          if (res.data.status === "ok" && res.data.recentOrders) {
            const recOrder: TableDef[] = res.data.recentOrders.map(
              (order, i) => {
                return {
                  SN: i + 1,
                  "Order No": order.id,
                  Buyer: `${order.user?.firstName} ${order.user?.lastName}`,
                  Quntity: order.quantity,
                  Status: order.status,
                  Product: order.product!.name,
                  id: order.id,
                };
              }
            );

            setRowData(recOrder);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        } catch (e) {
          console.log(e);
          setAlert({
            type: "error",
            message: "failed to load orders",
          });
        }
      })();
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <AdminLayout>
      <h1>Orders</h1>
      <div className={styles.orders}>
        <div className={styles.infoTabs}>
          {countLoading && <h2>Loading...</h2>}

          {ordersCount !== null && !countLoading && (
            <OrderingInfo
              deliveredCount={ordersCount!.delivered}
              pendingCount={ordersCount!.pending}
              processingCount={ordersCount!.processing}
              returnedCount={ordersCount!.returned}
              processingClick={() => {
                Router.push("/admin/orders/processing");
              }}
              deliveredClick={() => {
                Router.push("/admin/orders/delivered");
              }}
              pendingClick={() => {
                Router.push("/admin/orders/pending");
              }}
              returnedClick={() => {
                Router.push("/admin/orders/returnedOrders");
              }}
            />
          )}
        </div>
        <div className={styles.tables}>
          <TableHolder
            inputRef={recentOrdSearchRef}
            title="Recent Orders"
            columData={columnDefs}
            rowData={rowData}
            onCellClicked={(e) => {
              if (e.colDef.field === "Details") {
                Router.push(`/admin/orders/id?oid=${e.data.id}`);
              }
            }}
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
    </AdminLayout>
  );
};

export default Orders;
