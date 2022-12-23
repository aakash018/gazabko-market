import { AgGridReact } from "ag-grid-react";
import { AiFillHeart } from "react-icons/ai";
import { MdStorefront } from "react-icons/md";
import { TbGift } from "react-icons/tb";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import Image from "next/image";

import React, { useState } from "react";
import Router from "next/router";
import { useAuth } from "../../../context/User";

const SettingHomePage = () => {
  const { user } = useAuth();

  const [columnData] = useState([
    { field: "Order #", maxWidth: 90 },
    { field: "Placed On", maxWidth: 170 },
    { field: "Items" },
    { field: "Total" },
    {
      field: "Actions",
      cellRenderer: () => (
        <div
          style={{
            fontWeight: "bold",
            color: "var(--theme-color)",
            cursor: "pointer",
          }}
          onClick={() => {
            Router.push("/settings/manage");
          }}
        >
          Manage
        </div>
      ),
    },
  ]);

  const [rowData] = useState([
    {
      "Order #": "1",
      "Placed On": `${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDate()}`,
      Items: "Jeans Pant",
      Total: "Rs. 1999",
      Actions: "Manage",
    },
    {
      "Order #": "2",
      "Placed On": `${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDate()}`,
      Items: "Jeans Pant",
      Total: "Rs. 1999",
      Actions: "Manage",
    },
    {
      "Order #": "3",
      "Placed On": `${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDate()}`,
      Items: "Jeans Pant",
      Total: "Rs. 1999",
      Actions: "Manage",
    },
  ]);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>Settings</h1>
      <div style={{ display: "flex", gap: "10px" }}>
        <div
          style={{
            border: "1px solid #ddd",
            marginTop: "20px",
            padding: "10px 50px 10px 20px",
          }}
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
        >
          <span style={{ fontSize: "16px" }}>Address Book</span>
          <div style={{ display: "flex", marginTop: "5px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingRight: "50px",
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
                {user?.address.nearestLandmark}
              </span>
              <span style={{ fontSize: "14px" }}>
                {user?.address.deliveryAddress}
              </span>
              <span style={{ fontSize: "14px" }}>{user?.email}</span>
              <span style={{ fontSize: "14px" }}>{user?.phoneNo}</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "40px" }}>
        <h1>Your Orders</h1>
        <div style={{ marginTop: "20px" }}>
          <div
            className="ag-theme-alpine"
            style={{ width: 870, height: "200px" }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnData}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingHomePage;
