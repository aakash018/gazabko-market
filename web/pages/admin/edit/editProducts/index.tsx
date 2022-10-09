import React, { useState } from "react";
import AdminLayout from "../../../../components/Admin/AdminNav";
import EditOptionsButton from "../../../../components/Admin/shared/EditOptionsButton";

import styles from "../../../../styles/components/Admin/pages/EditProducts.module.scss";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import {
  MdOutlineAdd,
  MdOutlineReportProblem,
  MdReviews,
} from "react-icons/md";
import InfoCard from "../../../../components/Admin/shared/InfoCard";

import { FiPackage } from "react-icons/fi";
import { FaBoxOpen } from "react-icons/fa";
import { AgGridReact } from "ag-grid-react";
import Router from "next/router";

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
    { field: "Edit", width: 135 },
    { field: "Hide Item", width: 135 },
  ]);

  const handleInfoCardRoute = (route: string) => {
    Router.push(`/admin/edit/editProducts/${route}`);
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
            onClick={() => {}}
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
