import { AgGridReact } from "ag-grid-react";
import Router from "next/router";
import React, { useRef, useState } from "react";
import { BiEdit } from "react-icons/bi";
import SearchBar from "../../../components/Admin/shared/SearchBar";
import SellerNav from "../../../components/Seller/SellerNav";

import styles from "../../../styles/components/Seller/pages/AllProducts.module.scss";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

type TableDef = {
  SN: number;
  Product: string;
  Vendor: string;
  "Item Sold": number;
  "Item Status": string;
  Reviews: string;
  Edit: any;
  "Hide Item": any;
};

const AllProducts = () => {
  const [rowData] = useState<TableDef[]>([
    {
      SN: 1,
      Product: "xyz",
      Vendor: "xyz",
      "Item Sold": 45,
      "Item Status": "In Stock",
      Reviews: "",
      Edit: "",
      "Hide Item": "",
    },
    {
      SN: 1,
      Product: "xyz",
      Vendor: "xyz",
      "Item Sold": 45,
      "Item Status": "In Stock",
      Edit: "",
      Reviews: "",
      "Hide Item": "",
    },
    {
      SN: 1,
      Product: "xyz",
      Vendor: "xyz",
      "Item Sold": 45,
      "Item Status": "In Stock",
      Edit: "",
      "Hide Item": "",
      Reviews: "",
    },
    {
      SN: 1,
      Product: "xyz",
      Vendor: "xyz",
      "Item Sold": 45,
      "Item Status": "In Stock",
      Edit: "",
      "Hide Item": "",
      Reviews: "",
    },
    {
      SN: 1,
      Product: "xyz",
      Vendor: "xyz",
      "Item Sold": 45,
      "Item Status": "In Stock",
      Edit: "",
      "Hide Item": "",
      Reviews: "",
    },
    {
      SN: 1,
      Product: "xyz",
      Vendor: "xyz",
      "Item Sold": 45,
      "Item Status": "In Stock",
      Edit: "",
      "Hide Item": "",
      Reviews: "",
    },
  ]);

  const [columnDefs] = useState([
    { field: "SN", width: 70 },
    { field: "Product", width: 190 },
    { field: "Item Sold", width: 135 },
    { field: "Item Status", width: 135 },
    {
      field: "Review",
      width: 135,
      cellRenderer: () => (
        <div
          onClick={() => Router.push("/admin/edit/editProducts/productReviews")}
          style={{
            fontWeight: "bold",
            color: "var(--theme-color)",
            cursor: "pointer",
          }}
        >
          View
        </div>
      ),
    },
    {
      field: "Edit",
      width: 105,
      cellRenderer: () => (
        <div
          onClick={() => Router.push("/admin/edit/editProducts/add")}
          style={{
            fontSize: "25px",
            color: "var(--theme-color)",
          }}
        >
          <BiEdit style={{ cursor: "pointer" }} />
        </div>
      ),
    },
    {
      field: "Details",
      width: 105,
      cellRenderer: () => (
        <div
          onClick={() => Router.push("/seller/products/sdfsfd")}
          style={{
            fontWeight: "bold",
            color: "var(--theme-color)",
            cursor: "pointer",
          }}
        >
          View
        </div>
      ),
    },
  ]);

  const searchRef = useRef<HTMLInputElement>(null);
  return (
    <SellerNav>
      <h1>All Products</h1>
      <div className={styles.allProducts}>
        <div className={styles.categories}>
          <h2>Choose Category</h2>
          <select>
            <option value={"All Categories"}>All Categories</option>
            <option value={"Women's Fashion"}>Women's Fashion</option>
            <option value={"Men's Fashion"}>Men's Fashion</option>
            <option value={"Health And Beauty"}>Health And Beauty</option>
            <option value={"TV & Home Appliance"}>TV & Home Appliance</option>
            <option value={"Babies & Toys"}>abies & Toys</option>
            <option value={"Home & Lifestyle"}>Home & Lifestyle</option>
            <option value={"Sports & Outdoor"}>Sports & Outdoor</option>
          </select>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.table}>
            <div className={styles.search}>
              <SearchBar inputRef={searchRef} />
            </div>
            <div className={styles.main}>
              <div
                className={`ag-theme-alpine ${styles.main}`}
                style={{ height: 350, width: 890 }}
              >
                <AgGridReact
                  rowData={rowData}
                  columnDefs={columnDefs}
                ></AgGridReact>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SellerNav>
  );
};

export default AllProducts;
