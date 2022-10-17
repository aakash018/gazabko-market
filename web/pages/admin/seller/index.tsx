import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { MdDisabledVisible, MdPending, MdWarning } from "react-icons/md";
import AdminLayout from "../../../components/Admin/AdminNav";
import InfoCard from "../../../components/Admin/shared/InfoCard";

import styles from "../../../styles/components/Admin/pages/SellerPage.module.scss";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Router from "next/router";
import { TbDisabled } from "react-icons/tb";

interface TableDef {
  SN: number;
  "Vendor's Name": string;
  "Items sold last month": number;
  Details: any;
}

const VendorPage = () => {
  const [rowData] = useState<TableDef[]>([
    {
      SN: 1,
      "Vendor's Name": "Laxmi Store",
      "Items sold last month": 40,
      Details: "",
    },
    {
      SN: 1,
      "Vendor's Name": "Laxmi Store",
      "Items sold last month": 40,
      Details: "",
    },
    {
      SN: 3,
      "Vendor's Name": "Laxmi Store",
      "Items sold last month": 40,
      Details: "",
    },
    {
      SN: 5,
      "Vendor's Name": "Laxmi Store",
      "Items sold last month": 40,
      Details: "",
    },
    {
      SN: 6,
      "Vendor's Name": "Laxmi Store",
      "Items sold last month": 40,
      Details: "",
    },
    {
      SN: 7,
      "Vendor's Name": "Laxmi Store",
      "Items sold last month": 40,
      Details: "",
    },
    {
      SN: 8,
      "Vendor's Name": "Laxmi Store",
      "Items sold last month": 40,
      Details: "",
    },
    {
      SN: 9,
      "Vendor's Name": "Laxmi Store",
      "Items sold last month": 40,
      Details: "",
    },
    {
      SN: 10,
      "Vendor's Name": "Laxmi Store",
      "Items sold last month": 40,
      Details: "",
    },
  ]);

  const [columnDefs] = useState([
    { field: "SN", width: 60 },
    { field: "Vendor's Name" },
    { field: "Items sold last month" },
    {
      field: "Details",
      width: 90,
      cellRenderer: () => (
        <div
          style={{
            color: "#5494F5",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={() => Router.push("/admin/seller/laxmi-store")}
        >
          View
        </div>
      ),
    },
  ]);

  return (
    <AdminLayout>
      <div className={styles.VendorWraper}>
        <h1>Vendors</h1>
        <div className={styles.infoTabs}>
          <InfoCard
            title="Pending Verifications"
            amount={5}
            bgColor="#F36868"
            onViewClick={() => {
              Router.push("/admin/seller/pendingVerification");
            }}
          >
            <MdPending />
          </InfoCard>
          <InfoCard
            title="Verified Vendors"
            amount={5}
            bgColor="#5494F5"
            onViewClick={() => {
              Router.push("/admin/seller/verified");
            }}
          >
            <BiCheckCircle />
          </InfoCard>
          <InfoCard
            title="Deactivated Vendors"
            amount={5}
            bgColor="#EC1E5C"
            onViewClick={() => {
              Router.push("/admin/seller/deactivated");
            }}
          >
            <MdDisabledVisible />
          </InfoCard>
        </div>
        <div className={styles.topVendors}>
          <div className={styles.title}>Top Vendors of Last Month</div>
          <div className="ag-theme-alpine" style={{ height: 450, width: 580 }}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
            ></AgGridReact>
          </div>
        </div>
        <div className={styles.topVendors}>
          <div className={styles.title}>Vendors Verified this month</div>
          <div className="ag-theme-alpine" style={{ height: 450, width: 580 }}>
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

export default VendorPage;
