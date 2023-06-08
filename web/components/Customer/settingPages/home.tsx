import { AgGridReact } from "ag-grid-react";
import { AiFillHeart } from "react-icons/ai";
import { MdStorefront } from "react-icons/md";
import { TbGift } from "react-icons/tb";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import styles from "../../../styles/components/Customer/pages/settings/Profile.module.scss";

import Image from "next/image";

import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useAuth } from "../../../context/User";
import axios from "axios";
import { Order } from "../../../@types/global";
import { useAlert } from "../../../pages/_app";

interface TableDef {
  "Order #": string;
  "Placed On": string;
  Items: string;
  Price: number;
  Actions: any;
  Quantity: number;
}

const SettingHomePage = () => {
  const { user } = useAuth();

  const [columnData] = useState([
    { field: "Order #", maxWidth: 90 },
    { field: "Placed On", maxWidth: 170 },
    { field: "Items" },
    { field: "Price", maxWidth: 90 },
    { field: "Quantity", maxWidth: 110 },
    {
      field: "Actions",
      cellRenderer: () => (
        <div
          style={{
            fontWeight: "bold",
            color: "var(--theme-color)",
            cursor: "pointer",
          }}
        >
          Manage
        </div>
      ),
    },
  ]);
  const { setAlert } = useAlert();

  const [rowData, setRowData] = useState<TableDef[]>([]);

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      (async () => {
        try {
          const res = await axios.get<RespondType & { orders?: Order[] }>(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/order/orderHistory`,
            { withCredentials: true }
          );
          if (res.data.status === "ok" && res.data.orders) {
            const orderHistoryTable: TableDef[] = res.data.orders.map(
              (order, i) => ({
                "Order #": order.id as unknown as string,
                "Placed On": order.created_at.split("T")[0],
                Actions: "",
                Items: (order as any).product.name,
                Price: order.price,
                Quantity: order.quantity,
              })
            );

            setRowData(orderHistoryTable);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        } catch {
          setAlert({
            type: "error",
            message: "failed to connect to server",
          });
        }
      })();
    }

    return () => {
      ignore = true;
    };
  }, []);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={styles.profileWrapper}>
      <h1 className={styles.title}>Settings</h1>
      <div
        style={{ display: "flex", gap: "10px" }}
        className={styles.profileInfoHolder}
      >
        <div
          style={{
            border: "1px solid #ddd",
            marginTop: "20px",
            padding: "10px 50px 10px 20px",
          }}
          className={styles.profileInfoHolder}
        >
          <span style={{ fontSize: "16px" }}>My Profile</span>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                position: "relative",
                width: "150px",
                height: "150px",
              }}
            >
              <Image src={user!.avatar} layout="fill" objectFit="contain" />
            </div>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
                {user?.firstName} {user?.lastName}
              </div>
              <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                {user?.email}
              </div>
              <div>{user?.phoneNo}</div>
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  marginTop: "10px",
                  color: "var(--default-red)",
                  fontSize: "16px",
                }}
              >
                <div>
                  <AiFillHeart />
                </div>
                <div>
                  <TbGift />
                </div>
                <div>
                  <MdStorefront />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            border: "1px solid #ddd",
            marginTop: "20px",
            padding: "10px 60px 15px 15px",
          }}
          className={styles.addressHolder}
        >
          <span style={{ fontSize: "16px" }}>Address Book</span>
          <div style={{ display: "flex", marginTop: "5px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // paddingRight: "10px",
              }}
            >
              <span style={{ fontSize: "14px", color: "#757575" }}>
                Default Shipping Address
              </span>
              <span
                style={{
                  fontWeight: 600,
                  fontSize: "14px",
                  margin: "5px 0px",
                }}
              >
                {user?.firstName}
              </span>
              <span style={{ fontSize: "14px" }}>
                {user?.address[0].nearestLandmark}
              </span>
              <span style={{ fontSize: "14px" }}>
                {user?.address[0].deliveryAddress}
              </span>
              <span style={{ fontSize: "14px" }}>{user?.email}</span>
              <span style={{ fontSize: "14px" }}>{user?.phoneNo}</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "40px" }}>
        <h1 className={styles.orderTitle}>Your Orders</h1>
        <div style={{ marginTop: "20px" }}>
          <div
            className={`ag-theme-alpine ${styles.orderTable}`}
            // style={{ width: 870, height: "400px" }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnData}
              onCellClicked={(e) => {
                if (e.colDef.field === "Actions") {
                  Router.push(`settings/manage/${e.data?.["Order #"]}`);
                }
              }}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingHomePage;
