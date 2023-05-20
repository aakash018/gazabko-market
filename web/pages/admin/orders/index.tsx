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
  Quantity: number;
  "Order No": number;
  Status: "pending" | "processing" | "delivered";
  Size: string | undefined;
  Color: string;
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
  const [rowDataForRecentOrders, setRowDataForRecentOrders] = useState<
    TableDef[]
  >([]);

  const [rowDataForCanceledOrders, setRowDataForCanceledOrders] = useState<
    TableDef[]
  >([]);
  const [rowDataForReturnedOrders, setRowDataForReturnedOrders] = useState<
    TableDef[]
  >([]);

  const [columnDefs] = useState([
    { field: "SN", width: 60 },
    { field: "Product" },
    { field: "Size", width: 70 },
    { field: "Color", width: 150 },
    { field: "Quantity", width: 150 },
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

      // (async () => {
      //   try {
      //     const res = await axios.get<
      //       RespondType & {
      //         recentOrders: Order[];
      //         returnedOrders: Order[];
      //         canceledOrders: Order[];
      //       }
      //     >(
      //       `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/orders/getRecentOrders`,
      //       { withCredentials: true }
      //     );

      //     if (res.data.status === "ok" && res.data.recentOrders) {
      //       const recentOrderRowData: TableDef[] = res.data.recentOrders.map(
      //         (order, i) => ({
      //           SN: i + 1,
      //           Product: order.product!.name,
      //           "Order No": order.id,
      //           Status: order.status,
      //           Quantity: order.quantity,
      //           Size: order.size,
      //           Color: order.color,
      //         })
      //       );

      //       const returnedOrderRowData: TableDef[] =
      //         res.data.returnedOrders.map((order, i) => ({
      //           SN: i + 1,
      //           Product: order.product!.name,
      //           "Order No": order.id,
      //           Status: order.status,
      //           Quantity: order.quantity,
      //           Size: order.size,
      //           Color: order.color,
      //         }));

      //       const canceledOrderRowData: TableDef[] =
      //         res.data.canceledOrders.map((order, i) => ({
      //           SN: i + 1,
      //           Product: order.product!.name,
      //           "Order No": order.id,
      //           Status: order.status,
      //           Quantity: order.quantity,
      //           Size: order.size,
      //           Color: order.color,
      //         }));
      //       setRowDataForCanceledOrders(canceledOrderRowData);
      //       setRowDataForRecentOrders(recentOrderRowData);
      //       setRowDataForReturnedOrders(returnedOrderRowData);
      //     } else {
      //       setAlert({
      //         type: "error",
      //         message: res.data.message,
      //       });
      //     }
      //   } catch (e) {
      //     console.log(e);
      //     setAlert({
      //       type: "error",
      //       message: "failed to load orders",
      //     });
      //   }
      // })();
    }
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      (async () => {
        const res = await axios.get<
          RespondType & {
            recentOrders: Order[];
            // returnedOrders: Order[];
            canceledOrders: Order[];
          }
        >(
          `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/orders/recentOrders`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data);
        if (res.data.status === "ok") {
          const recentOrderRowData: TableDef[] = res.data.recentOrders.map(
            (order, i) => ({
              SN: i + 1,
              Product: order.product!.name,
              "Order No": order.id,
              Status: order.status,
              Quantity: order.quantity,
              Size: order.size,
              Color: order.color,
              id: order.id,
            })
          );

          // const returnedOrderRowData: TableDef[] = res.data.returnedOrders.map(
          //   (order, i) => ({
          //     SN: i + 1,
          //     Product: order.product!.name,
          //     "Order No": order.id,
          //     Status: order.status,
          //     Quantity: order.quantity,
          //     Size: order.size,
          //     Color: order.color,
          //   })
          // );

          const canceledOrderRowData: TableDef[] = res.data.canceledOrders.map(
            (order, i) => ({
              SN: i + 1,
              Product: order.product!.name,
              "Order No": order.id,
              Status: order.status,
              Quantity: order.quantity,
              Size: order.size,
              Color: order.color,
              id: order.id,
            })
          );
          setRowDataForCanceledOrders(canceledOrderRowData);
          setRowDataForRecentOrders(recentOrderRowData);
          // setRowDataForReturnedOrders(returnedOrderRowData);
        }
      })();
    }
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
          {/* <TableHolder
            inputRef={recentOrdSearchRef}
            title="Recent Orders"
            columData={columnDefs}
            rowData={rowData}
            onCellClicked={(e) => {
              if (e.colDef.field === "Details") {
                Router.push(`/admin/orders/id?oid=${e.data.id}`);
              }
            }}
          /> */}
          <TableHolder
            inputRef={allOrdSearchRef}
            title="All Orders"
            columData={columnDefs}
            rowData={rowDataForRecentOrders}
            onCellClicked={(e) => {
              if (e.colDef.field === "Details") {
                Router.push(`/admin/orders/id?oid=${e.data.id}`);
              }
            }}
          />
          <TableHolder
            inputRef={caancledOrdSearchRef}
            title="Cancled Orders"
            columData={columnDefs}
            rowData={rowDataForCanceledOrders}
          />
          {/* <TableHolder
            inputRef={caancledOrdSearchRef}
            title="Returned Orders"
            columData={columnDefs}
            rowData={rowData}
          /> */}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Orders;
