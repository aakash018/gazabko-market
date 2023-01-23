import { AgGridReact } from "ag-grid-react";
import Router from "next/router";
import React, { useEffect, useRef, useState } from "react";
import SearchBar from "../../../components/Admin/shared/SearchBar";
import SellerNav from "../../../components/Seller/SellerNav";

import styles from "../../../styles/components/Seller/pages/HiddenProducts.module.scss";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import { ProtuctType } from "../../../@types/global";
import { useAlert } from "../../_app";

type TableDef = {
  SN: number;
  "Product's Name": string;
  "Items Sold": number;
  "Signed Up Date": string;
  "Total Stock": number;
  id: number;
};

const HiddenProducts = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const { setAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const [rowData, setRowData] = useState<TableDef[]>([]);

  const [columnDefs] = useState([
    { field: "SN", width: 60 },
    { field: "Product's Name", resizable: true },
    { field: "Items Sold", width: 140 },
    { field: "Signed Up Date" },
    { field: "Total Stock" },
  ]);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      (async () => {
        try {
          setLoading(true);
          const res = await axios.get<
            RespondType & { hiddenProducts?: ProtuctType[] }
          >(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/products/hiddenProducts`,
            {
              withCredentials: true,
            }
          );
          setLoading(false);
          if (res.data.status === "ok" && res.data.hiddenProducts) {
            const products: TableDef[] = res.data.hiddenProducts.map(
              (product, i) => ({
                SN: i + 1,
                "Items Sold": product.timesBought,
                "Product's Name": product.name,
                "Signed Up Date": product.created_at,
                "Total Stock": product.totalStock,
                id: product.id,
              })
            );
            setRowData(products);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        } catch {
          setLoading(false);
          setAlert({
            type: "error",
            message: "failed to load hidden products",
          });
        }
      })();
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <SellerNav>
      <h1>Hidden Products</h1>
      {loading && <h2>Loading...</h2>}
      {!loading && (
        <div className={styles.hiddenProducts}>
          <div className={styles.tableContainer}>
            <div className={styles.search}>
              <SearchBar inputRef={searchRef} />
            </div>
            <div className={styles.table}>
              <div className={styles.table}>
                <div
                  className="ag-theme-alpine"
                  style={{ height: 280, width: 810 }}
                >
                  <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    onRowClicked={(event) => {
                      if (event.data)
                        Router.push(`/seller/products/id?pid=${event.data.id}`);
                    }}
                  ></AgGridReact>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}{" "}
    </SellerNav>
  );
};

export default HiddenProducts;
