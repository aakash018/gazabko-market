import React, { useRef, useState } from "react";
import { FaTshirt, FaFan, FaHeartbeat } from "react-icons/fa";
import { GiAmpleDress } from "react-icons/gi";
import { IoMdBeer } from "react-icons/io";
import { RiComputerFill } from "react-icons/ri";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { AgGridReact } from "ag-grid-react";

import styles from "../../../styles/components/Admin/pages/AllProducts.module.scss";

import Router from "next/router";
import { BiEdit } from "react-icons/bi";
import AdminLayout from "../../../components/Admin/AdminNav";
import SearchBar from "../../../components/Admin/shared/SearchBar";

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
  const searchRef = useRef<HTMLInputElement>(null);

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
    { field: "Vendor", width: 190 },
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
          onClick={() => Router.push("/admin/edit/editProducts/18598787")}
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

  return (
    <AdminLayout>
      <div>
        <h1>All Products</h1>
      </div>
      <div className={styles.allProducts}>
        <div className={styles.categories}>
          <div className={styles.title}>
            <h2>Catogries</h2>
          </div>
          <div className={styles.list}>
            <div className={styles.catHolder}>
              <GiAmpleDress size={"25px"} className={styles.catogryIcon} />
            </div>
            <div className={styles.catHolder}>
              <FaTshirt size={"25px"} className={styles.catogryIcon} />
            </div>
            <div className={styles.catHolder}>
              <FaFan size={"25px"} className={styles.catogryIcon} />
            </div>
            <div className={styles.catHolder}>
              <RiComputerFill size={"25px"} className={styles.catogryIcon} />
            </div>
            <div className={styles.catHolder}>
              <FaHeartbeat size={"25px"} className={styles.catogryIcon} />
            </div>
            <div className={styles.catHolder}>
              <IoMdBeer size={"25px"} className={styles.catogryIcon} />
            </div>
          </div>
        </div>
        <div className={styles.table}>
          <div className={styles.search}>
            <SearchBar inputRef={searchRef} />
          </div>
          <div
            className={`ag-theme-alpine ${styles.main}`}
            style={{ height: 350, width: "100%" }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AllProducts;
