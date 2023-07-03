import React, { FormEvent, useEffect, useRef, useState } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { AgGridReact } from "ag-grid-react";

import styles from "../../../styles/components/Admin/pages/AllProducts.module.scss";

import Router from "next/router";

import AdminLayout from "../../../components/Admin/AdminNav";
import SearchBar from "../../../components/Admin/shared/SearchBar";
import axios from "axios";
import { ProtuctType, Category } from "../../../@types/global";
import { useAlert } from "../../_app";

type TableDef = {
  SN: number;
  Product: string;
  Vendor: string;
  "Item Sold": number;
  // "Item Status": string;
  id: any;
};

const AllProducts = () => {
  const searchRef = useRef<HTMLInputElement>(null);

  const [rowData, setRowData] = useState<TableDef[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { setAlert } = useAlert();

  const [columnDefs] = useState([
    { field: "SN", width: 70 },
    { field: "Product", width: 190 },
    { field: "Vendor", width: 190 },
    { field: "Item Sold", width: 135 },
    { field: "Remaining Stock", width: 160 },
    // { field: "Item Status", width: 135 },
    // {
    //   field: "Edit",
    //   width: 105,
    //   cellRenderer: () => (
    //     <div
    //       onClick={() => Router.push("/admin/edit/editProducts/add")}
    //       style={{
    //         fontSize: "25px",
    //         color: "var(--theme-color)",
    //       }}
    //     >
    //       <BiEdit style={{ cursor: "pointer" }} />
    //     </div>
    //   ),
    // },
    {
      field: "Details",
      width: 105,
      cellRenderer: () => (
        <div
          onClick={() => Router.push("/admin/edit/editProducts/18598787")}
          style={{
            fontWeight: "bold",
            color: "var(--theme-color)",
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
            RespondType & { products?: ProtuctType[]; categories: Category[] }
          >(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/products/getAllProducts`,
            { withCredentials: true }
          );
          console.log(res.data);
          if (res.data.status === "ok" && res.data.products) {
            const productTable: TableDef[] = res.data.products.map(
              (product, i) => ({
                SN: i + 1,
                Product: product.name,
                "Item Sold": product.timesBought,
                Vendor: product.seller ? product.seller.storeName : "Admin",
                id: product.id,
                "Remaining Stock": product.totalStock,
                // "Item Status":
                //   product.totalStock > 0 ? "In Stock" : "Out Of Stock",
              })
            );

            setRowData(productTable);

            setCategories(res.data.categories);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        } catch (e) {
          console.log(e);
          setAlert({
            type: "error",
            message: "failed to connect to servers",
          });
        }
      })();
    }
    return () => {
      ignore = true;
    };
  }, []);
  const handleCatChange = async (e: FormEvent<HTMLSelectElement>) => {
    try {
      const res = await axios.get<RespondType & { products: ProtuctType[] }>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/products/getProductsWithCat`,
        {
          params: {
            category: e.currentTarget.value,
          },
          withCredentials: true,
        }
      );

      if (res.data.status === "ok") {
        const productTable: TableDef[] = res.data.products.map((prod, i) => ({
          SN: i + 1,
          "Item Sold": prod.timesBought,
          Product: prod.name,
          Vendor: prod.seller ? prod.seller.storeName : "Admin",
          id: prod.id,
          "Item Status": prod.totalStock > 0 ? "In Stock" : "Out of Stock",
        }));

        setRowData(productTable);
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch (e) {
      console.log(e);
      setAlert({
        type: "error",
        message: "failed to connect to server",
      });
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1>All Products</h1>
      </div>
      <div className={styles.allProducts}>
        <div className={styles.categories}>
          <h2>Choose Category</h2>
          <select onChange={handleCatChange}>
            <option value={"All Categories"}>All Categories</option>

            {categories.map((cat, i) => (
              <option value={cat.name} key={i}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.table}>
          <div className={styles.search}>
            <SearchBar inputRef={searchRef} />
          </div>
          <div className={`ag-theme-alpine ${styles.main}`}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              onCellClicked={(e) => {
                if (e.colDef.field === "Details") {
                  Router.push(`/admin/products/id?pid=${e.data!.id}`);
                }
              }}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AllProducts;
