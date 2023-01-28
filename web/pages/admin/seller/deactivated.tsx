import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/Admin/AdminNav";
import SearchBar from "../../../components/Admin/shared/SearchBar";

import styles from "../../../styles/components/Admin/pages/DeactivatedVendors.module.scss";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Router from "next/router";
import axios from "axios";
import { Seller } from "../../../@types/global";
import { useAlert } from "../../_app";

type TableDef = {
  SN: number;
  "Vendor's Name": string;
  "Items Sold": number;
  "Signed Up Date": string;
  "Total Items": number;
  id: number;
  Details: any;
};

const DeactivatedVendors = () => {
  const searchRef = useRef<HTMLInputElement>(null);

  const [rowData, setRowData] = useState<TableDef[]>([]);
  const { setAlert } = useAlert();

  const [columnDefs] = useState([
    { field: "SN", width: 60 },
    { field: "Vendor's Name" },
    { field: "Items Sold", width: 140 },
    { field: "Total Items", width: 140 },
    { field: "Signed Up Date" },
    {
      field: "Details",
      width: 100,
      cellRenderer: () => (
        <div
          style={{
            color: "#5494F5",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          View
        </div>
      ),
    },
  ]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await axios.get<RespondType & { sellers?: Seller[] }>(
          `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/seller/deactivatedSellers`,
          {
            withCredentials: true,
          }
        );
        if (res.data.status === "ok" && res.data.sellers) {
          const sellerTable: TableDef[] = res.data.sellers.map((seller, i) => ({
            SN: i + 1,
            "Vendor's Name": seller.storeName,
            "Signed Up Date": seller.created_at,
            "Items Sold": seller.itemsSold,
            "Total Items": seller.productCount as number,
            Details: "",
            id: seller.id,
          }));

          setRowData(sellerTable);
        } else {
          setAlert({
            type: "error",
            message: res.data.message,
          });
        }
      } catch {
        setAlert({
          type: "error",
          message: "failed to load sellers",
        });
      }
    })();
    return () => {
      ignore = false;
    };
  }, []);

  return (
    <AdminLayout>
      <h1> Deactivated Vendors</h1>
      <div
        className={styles.deactivatedVendors}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div className={styles.search} style={{ alignSelf: "flex-end" }}>
            <SearchBar inputRef={searchRef} />
          </div>
          <div className={styles.table}>
            <div
              className="ag-theme-alpine"
              style={{ height: 280, width: 870 }}
            >
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                onCellClicked={(e) => {
                  if (e.colDef.field === "Details") {
                    Router.push(`/admin/seller/id?sid=${e.data?.id}`);
                  }
                }}
              ></AgGridReact>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DeactivatedVendors;
