import Router from "next/router";
import React, { useRef, useState } from "react";
import SellerNav from "../../../components/Seller/SellerNav";
import { TableHolder } from "../../admin/orders";

type TableDef = {
  SN: number;
  Name: string;
  "Signed Up Date": string;
  "Total Items Boughts": number;
  Status: "Verified" | "Not Verified";
  Details: any;
};

const TopFollowers = () => {
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TableHolder
          columData={columnDefs}
          rowData={rowData}
          inputRef={searchRef}
          title={"New Followers"}
        />
      </div>
    </SellerNav>
  );
};

export default TopFollowers;
