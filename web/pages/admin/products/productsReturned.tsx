import Router from "next/router";
import React, { useRef } from "react";
import AdminLayout from "../../../components/Admin/AdminNav";
import { TableHolder } from "../orders";

const ProductsReturned = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const rowData = [
    {
      SN: 1,
      "Product Name": "Golden Magic Star Shoes",
      "Shipped Date": "27 August 2023",
      "Returned Date": "28 August 2023",
      Details: "View",
    },
    {
      SN: 2,
      "Product Name": "Golden Magic Star Shoes",
      "Shipped Date": "27 August 2023",
      "Returned Date": "28 August 2023",
      Details: "View",
    },
    {
      SN: 3,
      "Product Name": "Golden Magic Star Shoes",
      "Shipped Date": "27 August 2023",
      "Returned Date": "28 August 2023",
      Details: "View",
    },
    {
      SN: 4,
      "Product Name": "Golden Magic Star Shoes",
      "Shipped Date": "27 August 2023",
      "Returned Date": "28 August 2023",
      Details: "View",
    },
    {
      SN: 5,
      "Product Name": "Golden Magic Star Shoes",
      "Shipped Date": "27 August 2023",
      "Returned Date": "28 August 2023",
      Details: "View",
    },
    {
      SN: 6,
      "Product Name": "Golden Magic Star Shoes",
      "Shipped Date": "27 August 2023",
      "Returned Date": "28 August 2023",
      Details: "View",
    },
  ];

  const coloumDef = [
    { field: "SN", width: 60 },
    { field: "Product Name", width: "250px", resizable: true },
    { field: "Shipped Date" },
    { field: "Returned Date" },
    {
      field: "Details",
      cellRenderer: () => (
        <div
          style={{
            color: "var(--theme-color)",
            fontWeight: "bold",
          }}
          onClick={() => Router.push("/admin/orders/prodi")}
        >
          View
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <h1>Products Returned</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TableHolder
          columData={coloumDef}
          title=""
          rowData={rowData}
          inputRef={searchRef}
        />
      </div>
    </AdminLayout>
  );
};

export default ProductsReturned;
