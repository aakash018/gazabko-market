import { AgGridReact } from "ag-grid-react";
import Router from "next/router";
import React, { useEffect, useRef, useState } from "react";
import SellerNav from "../../../components/Seller/SellerNav";
import Button from "../../../components/shared/Button";

import styles from "../../../styles/components/Seller/pages/OutOfStock.module.scss";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import SearchBar from "../../../components/Admin/shared/SearchBar";
import axios from "axios";
import { ProtuctType } from "../../../@types/global";
type TableDef = {
  SN: number;
  Product: string;
  "Items Sold": number;
  Brand: string;
  id: number;
};

const OutOfStock = () => {
  const searchRef = useRef<HTMLInputElement>(null);

  const [rowData, setRowData] = useState<TableDef[]>([]);

  const [columnDefs] = useState([
    { field: "SN", width: 60 },
    { field: "Product" },
    { field: "Brand" },
    { field: "Items Sold" },
  ]);

  useEffect(() => {
    (async () => {
      const res = await axios.get<RespondType & { products?: ProtuctType[] }>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/products/outOfStock`,
        {
          withCredentials: true,
        }
      );
      if (res.data.status === "ok" && res.data.products) {
        const productForTable: TableDef[] = res.data.products.map(
          (product, i) => ({
            SN: i + 1,
            Product: product.name,
            Brand: product.brand,
            "Items Sold": product.timesBought,
            id: product.id,
          })
        );

        setRowData(productForTable);
      }
    })();
  }, []);

  return (
    <SellerNav>
      <div>
        <h1>Products Out of Stock</h1>
      </div>
      <div className={styles.outOfStock}>
        <div className={styles.tableContainer}>
          <div className={styles.table}>
            <div className={styles.search}>
              <SearchBar inputRef={searchRef} />
            </div>
            <div className={`ag-theme-alpine ${styles.main}`}>
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                onRowClicked={(e) => {
                  if (e.data)
                    Router.push(`/seller/products/id?pid=${e.data.id}`);
                }}
              ></AgGridReact>
            </div>
          </div>
        </div>
      </div>
    </SellerNav>
  );
};

export default OutOfStock;
