import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/Admin/AdminNav";
import SearchBar from "../../../components/Admin/shared/SearchBar";

import styles from "../../../styles/components/Admin/pages/VerifiedSellers.module.scss";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Router from "next/router";
import axios from "axios";
import { Seller } from "../../../@types/global";

type TableDef = {
  SN: number;
  "Vendor's Name": string;
  "Items Sold": number;
  "Signed Up Date": string;
  "Total Items": number;
  Details: any;
  id: number;
};

const Verified = () => {
  const searchInput = useRef<HTMLInputElement>(null);

  const [rowData, setRowData] = useState<TableDef[]>([]);

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

    if (!ignore) {
      (async () => {
        try {
          const res = await axios.get<
            RespondType & { verifiedSellers?: Seller[] }
          >(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/seller/getVerifiedSeller`,
            {
              withCredentials: true,
            }
          );
          console.log();
          if (res.data.status === "ok" && res.data.verifiedSellers) {
            const vriSeller: TableDef[] = res.data.verifiedSellers.map(
              (seller, i) => {
                return {
                  SN: i + 1,
                  "Items Sold": seller.itemsSold,
                  "Vendor's Name": seller.storeName,
                  "Total Items": seller.productCount as number,
                  "Signed Up Date": seller.created_at,
                  Details: "",
                  id: seller.id,
                };
              }
            );

            setRowData(vriSeller);
          }
        } catch {}
      })();
    }

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <AdminLayout>
      <div>
        <h1>Verified Sellers</h1>
      </div>
      <div className={styles.verifiedSellers}>
        <div className={styles.content}>
          <div className={styles.search}>
            <SearchBar inputRef={searchInput} />
          </div>
          <div className={styles.table}>
            <div className={`ag-theme-alpine ${styles.mainTable}`} style={{}}>
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                onCellClicked={(e) => {
                  if (e.colDef.field === "Details" && e.data) {
                    Router.push(`/admin/seller/id?sid=${e.data.id}`);
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

export default Verified;
