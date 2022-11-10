import Router from "next/router";
import React, { useRef, useState } from "react";
import CustomersInfoHolder from "../../../components/Admin/shared/CustomersInfoHolder";
import SellerNav from "../../../components/Seller/SellerNav";

import styles from "../../../styles/components/Seller/pages/CustomerPage.module.scss";
import { TableHolder } from "../../admin/orders";

type TableDef = {
  SN: number;
  Name: string;
  "Signed Up Date": string;
  "Total Items Boughts": number;
  Status: "Verified" | "Not Verified";
  Details: any;
};

const CustomersPage = () => {
  const searchRef = useRef<HTMLInputElement>(null);

  const [rowData] = useState<TableDef[]>([
    {
      SN: 1,
      "Signed Up Date": "21 Feb 2022",
      Name: "Laxmi Bhattarai",
      "Total Items Boughts": 20,
      Details: "",
      Status: "Verified",
    },
  ]);

  const [columnDefs] = useState([
    { field: "SN", width: 60 },
    { field: "Name" },
    { field: "Signed Up Date", width: 150 },
    { field: "Total Items Boughts" },
    { field: "Status", width: 150 },
    {
      field: "Details",
      width: 150,
      cellRenderer: () => (
        <div
          style={{
            fontWeight: "bold",
            color: "#5494F5",
          }}
          onClick={() => {
            Router.push("/seller/customers/sdad");
          }}
        >
          View
        </div>
      ),
    },
  ]);

  return (
    <SellerNav>
      <h1>Customers</h1>
      <div className={styles.topShowcase}>
        <div className={styles.topBuyers}>
          <CustomersInfoHolder
            title="Recently Added Customers"
            onViewClick={() => {
              Router.push("/admin/customers/newCustomers");
            }}
            route={"/seller/customers/fsdf"}
          />
        </div>
        <div className={styles.newCusomers}>
          <CustomersInfoHolder
            title="Top Customers This Month"
            onViewClick={() => {
              Router.push("/admin/customers/topCustomers");
            }}
            route={"/seller/customers/fsdf"}
          />
        </div>
      </div>
      <div className={styles.allCustomemrs}>
        <TableHolder
          rowData={rowData}
          columData={columnDefs}
          inputRef={searchRef}
          title="All Followers"
        />
      </div>
    </SellerNav>
  );
};

export default CustomersPage;
