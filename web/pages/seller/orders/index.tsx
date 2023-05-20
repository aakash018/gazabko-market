import axios from "axios";
import Router from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Order } from "../../../@types/global";
import OrderingInfo from "../../../components/Admin/OrderingInfo";
import SellerNav from "../../../components/Seller/SellerNav";

import styles from "../../../styles/components/Seller/pages/OrdersPage.module.scss";
import { TableHolder } from "../../admin/orders";
import { useAlert } from "../../_app";

interface TableDef {
  SN: number;
  Product: string;
  Quantity: number;
  "Order No": number;
  Status: "pending" | "processing" | "delivered";
  Size: string | undefined;
  Color: string;
}

interface CountType {
  pendingCount: number;
  processingCount: number;
  deliveredCount: number;
  returnedCount: number;
}

const OrdersPage = () => {
  const recentOrdSearchRef = useRef<HTMLInputElement>(null);
  const allOrdSearchRef = useRef<HTMLInputElement>(null);
  const caancledOrdSearchRef = useRef<HTMLInputElement>(null);

  const { setAlert } = useAlert();

  const [rowDataForRecentOrders, setRowDataForRecentOrders] = useState<
    TableDef[]
  >([]);

  const [rowDataForCanceledOrders, setRowDataForCanceledOrders] = useState<
    TableDef[]
  >([]);
  const [rowDataForReturnedOrders, setRowDataForReturnedOrders] = useState<
    TableDef[]
  >([]);

  const [dataCount, setDataCount] = useState<CountType | null>(null);

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
        try {
          const res = await axios.get<RespondType & { count?: CountType }>(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/sellerOrder/orderCounts`,
            {
              withCredentials: true,
            }
          );
          // console.log(res.data);
          if (res.data.status === "ok" && res.data.count) {
            setDataCount(res.data.count);
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
            message: "failed to load counts",
          });
        }
      })();
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
            returnedOrders: Order[];
            canceledOrders: Order[];
          }
        >(
          `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/sellerOrder/recentOrders`,
          { withCredentials: true }
        );
        console.log(res.data);
        if (
          res.data.status === "ok" &&
          res.data.recentOrders &&
          res.data.returnedOrders &&
          res.data.canceledOrders
        ) {
          const recentOrderRowData: TableDef[] = res.data.recentOrders.map(
            (order, i) => ({
              SN: i + 1,
              Product: order.product!.name,
              "Order No": order.id,
              Status: order.status,
              Quantity: order.quantity,
              Size: order.size,
              Color: order.color,
            })
          );

          const returnedOrderRowData: TableDef[] = res.data.returnedOrders.map(
            (order, i) => ({
              SN: i + 1,
              Product: order.product!.name,
              "Order No": order.id,
              Status: order.status,
              Quantity: order.quantity,
              Size: order.size,
              Color: order.color,
            })
          );

          const canceledOrderRowData: TableDef[] = res.data.canceledOrders.map(
            (order, i) => ({
              SN: i + 1,
              Product: order.product!.name,
              "Order No": order.id,
              Status: order.status,
              Quantity: order.quantity,
              Size: order.size,
              Color: order.color,
            })
          );
          setRowDataForCanceledOrders(canceledOrderRowData);
          setRowDataForRecentOrders(recentOrderRowData);
          setRowDataForReturnedOrders(returnedOrderRowData);
        }
      })();
    }
  }, []);

  return (
    <SellerNav>
      <h1>Orders</h1>
      <div className={styles.orders}>
        <div className={styles.infoTabs}>
          {dataCount === null && <h2>Lodging...</h2>}
          {dataCount && (
            <OrderingInfo
              pendingCount={dataCount!.pendingCount}
              deliveredCount={dataCount!.deliveredCount}
              processingCount={dataCount!.processingCount}
              processingClick={() => {
                Router.push("/seller/orders/processing");
              }}
              deliveredClick={() => {
                Router.push("/seller/orders/delivered");
              }}
              pendingClick={() => {
                Router.push("/seller/orders/pending");
              }}
              returnedCount={dataCount!.returnedCount}
              returnedClick={() => {
                Router.push("/seller/orders/returnedOrders");
              }}
            />
          )}
        </div>
        <div className={styles.tables}>
          <TableHolder
            inputRef={recentOrdSearchRef}
            title="Recent Orders"
            columData={columnDefs}
            rowData={rowDataForRecentOrders}
            onRowClick={(e) => {
              Router.push(`/seller/orders/id?oid=${e.data["Order No"]}`);
            }}
          />
          {/* <TableHolder
            inputRef={allOrdSearchRef}
            title="All Orders"
            columData={columnDefs}
            rowData={rowData}
            onRowClick={(e) => {
              Router.push(`/seller/orders/id?oid=${e.data["Order No"]}`);
            }}
          /> */}
          <TableHolder
            inputRef={caancledOrdSearchRef}
            title="Returned Orders"
            columData={columnDefs}
            rowData={rowDataForReturnedOrders}
            onRowClick={(e) => {
              Router.push(`/seller/orders/id?oid=${e.data["Order No"]}`);
            }}
          />
          <TableHolder
            inputRef={caancledOrdSearchRef}
            title="Cancled Orders"
            columData={columnDefs}
            rowData={rowDataForCanceledOrders}
            onRowClick={(e) => {
              Router.push(`/seller/orders/${e.data["Order No"]}`);
            }}
          />
        </div>
      </div>
    </SellerNav>
  );
};

export default OrdersPage;
