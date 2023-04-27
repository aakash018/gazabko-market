import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";

import styles from "../../../styles/components/Admin/pages/outOfStock.module.scss";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import Router from "next/router";
import AdminLayout from "../../../components/Admin/AdminNav";
import Button from "../../../components/shared/Button";
import axios from "axios";
import { ProtuctType } from "../../../@types/global";
import { useAlert } from "../../_app";

type TableDef = {
  SN: number;
  Product: string;
  Vendor: string;
  "Items Sold": number;
  "View Product": any;
  Edit: any;
  id: number;
};

const OutOfStock = () => {
  const [rowData, setRowData] = useState<TableDef[]>([]);

  const { setAlert } = useAlert();

  const [columnDefs] = useState([
    { field: "SN", width: 60 },
    { field: "Product" },
    { field: "Vendor" },
    { field: "Items Sold" },
    {
      field: "View Product",
      cellRenderer: () => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              color: "var(--theme-color)",
              fontWeight: "bold",
            }}
          >
            View
          </div>
        );
      },
    },
  ]);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      (async () => {
        try {
          const res = await axios.get<
            RespondType & { products?: ProtuctType[] }
          >(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/products/getHiddenProducts`,
            {
              withCredentials: true,
            }
          );
          if (res.data.status === "ok" && res.data.products) {
            const productForTable: TableDef[] = res.data.products.map(
              (product, i) => ({
                SN: i + 1,
                Product: product.name,
                Vendor: product.store as string,
                "Items Sold": product.timesBought,
                Edit: "",
                "View Product": "",
                id: product.id,
              })
            );

            setRowData(productForTable);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        } catch {
          setAlert({
            type: "error",
            message: "failed to load info",
          });
        }
      })();
      return () => {
        ignore = true;
      };
    }
  }, []);

  return (
    <AdminLayout>
      <div>
        <h1>Hidden Products</h1>
      </div>
      <div className={styles.outOfStock}>
        <div
          className={styles.table}
          style={{
            display: "grid",
            placeContent: "center",
          }}
        >
          <div
            className="ag-theme-alpine"
            style={{ height: "500px", width: "870px" }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              onCellClicked={(e) => {
                if (e.colDef.field === "View Product" && e.data) {
                  Router.push(`/admin/products/id?pid=${e.data.id}`);
                }
              }}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OutOfStock;
