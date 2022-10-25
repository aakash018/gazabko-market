import Router from "next/router";
import React, { useRef, useState } from "react";
import { TableHolder } from ".";
import AdminLayout from "../../../components/Admin/AdminNav";

interface TableDef {
  SN: number;
  Product: string;
  Buyer: string;
  Quntity: number;
  "Order No": number;
  Status: "Verified" | "Not Verified";
}

const Pending: React.FC = () => {
  const searchRef = useRef<HTMLInputElement>(null);

  const [rowData] = useState<TableDef[]>([
    {
      SN: 1,
      Product: "A random Product",
      "Order No": 654654646464,
      Buyer: "Laxmi Bhattarai",
      Status: "Verified",
      Quntity: 15,
    },
    {
      SN: 2,
      Product: "A random Product",
      "Order No": 654654646464,
      Buyer: "Laxmi Bhattarai",
      Status: "Verified",
      Quntity: 15,
    },
    {
      SN: 3,
      Product: "A random Product",
      "Order No": 654654646464,
      Buyer: "Laxmi Bhattarai",
      Status: "Verified",
      Quntity: 15,
    },
    {
      SN: 4,
      Product: "A random Product",
      "Order No": 654654646464,
      Buyer: "Laxmi Bhattarai",
      Status: "Verified",
      Quntity: 15,
    },
    {
      SN: 5,
      Product: "A random Product",
      "Order No": 654654646464,
      Buyer: "Laxmi Bhattarai",
      Status: "Verified",
      Quntity: 15,
    },
    {
      SN: 6,
      Product: "A random Product",
      "Order No": 654654646464,
      Buyer: "Laxmi Bhattarai",
      Status: "Verified",
      Quntity: 15,
    },
    {
      SN: 7,
      Product: "A random Product",
      "Order No": 654654646464,
      Buyer: "Laxmi Bhattarai",
      Status: "Verified",
      Quntity: 15,
    },
    {
      SN: 8,
      Product: "A random Product",
      "Order No": 654654646464,
      Buyer: "Laxmi Bhattarai",
      Status: "Verified",
      Quntity: 15,
    },
    {
      SN: 9,
      Product: "A random Product",
      "Order No": 654654646464,
      Buyer: "Laxmi Bhattarai",
      Status: "Verified",
      Quntity: 15,
    },
    {
      SN: 10,
      Product: "A random Product",
      "Order No": 654654646464,
      Buyer: "Laxmi Bhattarai",
      Status: "Verified",
      Quntity: 15,
    },
    {
      SN: 11,
      Product: "A random Product",
      "Order No": 654654646464,
      Buyer: "Laxmi Bhattarai",
      Status: "Verified",
      Quntity: 15,
    },
    {
      SN: 12,
      Product: "A random Product",
      "Order No": 654654646464,
      Buyer: "Laxmi Bhattarai",
      Status: "Verified",
      Quntity: 15,
    },
    {
      SN: 13,
      Product: "A random Product",
      "Order No": 654654646464,
      Buyer: "Laxmi Bhattarai",
      Status: "Verified",
      Quntity: 15,
    },
    {
      SN: 14,
      Product: "A random Product",
      "Order No": 654654646464,
      Buyer: "Laxmi Bhattarai",
      Status: "Verified",
      Quntity: 15,
    },
    {
      SN: 15,
      Product: "A random Product",
      "Order No": 654654646464,
      Buyer: "Laxmi Bhattarai",
      Status: "Verified",
      Quntity: 15,
    },
    {
      SN: 16,
      Product: "A random Product",
      "Order No": 654654646464,
      Buyer: "Laxmi Bhattarai",
      Status: "Verified",
      Quntity: 15,
    },
  ]);

  const [columnDefs] = useState([
    { field: "SN", width: 60 },
    { field: "Product" },
    { field: "Buyer" },
    { field: "Quntity", width: 150 },
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

  return (
    <AdminLayout>
      <h1>Pending Orders</h1>
      <TableHolder
        inputRef={searchRef}
        title=""
        columData={columnDefs}
        rowData={rowData}
        height={800}
      />
    </AdminLayout>
  );
};

export default Pending;
