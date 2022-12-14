import React, { useState } from "react";

import styles from "../../../styles/components/Admin/pages/EditProducts.module.scss";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import {
  MdOutlineAdd,
  MdOutlineReportProblem,
  MdReviews,
} from "react-icons/md";

import { FiPackage } from "react-icons/fi";
import { FaBoxOpen } from "react-icons/fa";
import { AgGridReact } from "ag-grid-react";
import Router from "next/router";
import { BiEdit } from "react-icons/bi";
import AdminLayout from "../../../components/Admin/AdminNav";
import EditOptionsButton from "../../../components/Admin/shared/EditOptionsButton";
import InfoCard from "../../../components/Admin/shared/InfoCard";

type TableDef = {
  SN: number;
  Product: string;
  Vendor: string;
  "Item Sold": number;
  "Item Status": "In Stock" | "Out of Stock";
  Edit: any;
  "Hide Item": any;
};

const EditProducts: React.FC = () => {
  const [rowData] = useState<TableDef[]>([
    {
      SN: 1,
      Product: "xyz",
      Vendor: "xyz",
      "Item Sold": 45,
      "Item Status": "In Stock",
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
    },
    {
      SN: 1,
      Product: "xyz",
      Vendor: "xyz",
      "Item Sold": 45,
      "Item Status": "In Stock",
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
    },
  ]);

  const [columnDefs] = useState([
    { field: "SN", width: 70 },
    { field: "Product", width: 220 },
    { field: "Vendor", width: 220 },
    { field: "Item Sold", width: 135 },
    { field: "Item Status", width: 135 },
    {
      field: "Edit",
      width: 135,
      cellRenderer: () => (
        <div
          onClick={() => Router.push("/admin/products/add")}
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
      cellRenderer: () => (
        <div
          onClick={() => Router.push("/admin/products/18598787")}
          style={{
            fontWeight: "bold",
            color: "var(--theme-color)",
            cursor: "pointer",
          }}
        >
          View
        </div>
      ),
      width: 135,
    },
  ]);

  const handleInfoCardRoute = (route: string) => {
    Router.push(`/admin/products/${route}`);
  };

  return (
    <AdminLayout>
      <div className={styles.editProducts}>
        <div>
          <h1>Edit Products</h1>
        </div>
        <div className={styles.options}>
          <EditOptionsButton
            icon={<MdOutlineAdd />}
            text={"Add Products"}
            bgColor={"#5494F5"}
            onClick={() => {
              handleInfoCardRoute("add");
            }}
          />
          <InfoCard
            amount={52}
            bgColor={"#00AB77"}
            title="Total Product"
            onViewClick={() => {
              handleInfoCardRoute("allProducts");
            }}
          >
            <FiPackage />
          </InfoCard>
          <InfoCard
            amount={52}
            bgColor={"#F36868"}
            title="Products out of stock"
            onViewClick={() => {
              handleInfoCardRoute("outOfStock");
            }}
          >
            <FaBoxOpen />
          </InfoCard>
          <InfoCard
            amount={52}
            bgColor={"#9E1EEC"}
            title="Products Reviews"
            onViewClick={() => {
              handleInfoCardRoute("productReviews");
            }}
          >
            <MdReviews />
          </InfoCard>
          <InfoCard
            amount={52}
            bgColor={"#EC1E5C"}
            title="Products Reported"
            onViewClick={() => {
              handleInfoCardRoute("productReports");
            }}
          >
            <MdOutlineReportProblem />
          </InfoCard>
          <InfoCard
            amount={52}
            bgColor={"#48bdbd"}
            title="Products Returned"
            onViewClick={() => {
              handleInfoCardRoute("productsReturned");
            }}
          >
            <MdOutlineReportProblem />
          </InfoCard>
        </div>
        <div className={styles.table}>
          <div className={styles.title}>
            <h2>Top Selling Products</h2>
          </div>
          <div
            className={`ag-theme-alpine ${styles.main}`}
            style={{ height: 400, width: "100%" }}
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

export default EditProducts;
