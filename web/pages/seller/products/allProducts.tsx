import { AgGridReact } from "ag-grid-react";
import Router from "next/router";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { BiEdit } from "react-icons/bi";
import SearchBar from "../../../components/Admin/shared/SearchBar";
import SellerNav from "../../../components/Seller/SellerNav";

import styles from "../../../styles/components/Seller/pages/AllProducts.module.scss";
import { Category, ProtuctType } from "../../../@types/global";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import { useAlert } from "../../_app";
import { SelectionChangedEvent } from "ag-grid-community";

type TableDef = {
  SN: number;
  Product: string;
  "Item Sold": number;
  "Item Status": string;
};

const AllProducts = () => {
  const [rowData, setRowData] = useState<TableDef[]>([]);
  const { setAlert } = useAlert();
  const [columnDefs] = useState([
    { field: "SN", width: 70 },
    { field: "Product", width: 190 },
    { field: "Item Sold", width: 135 },
    { field: "Item Status", width: 135 },
    {
      field: "Review",
      width: 135,
      cellRenderer: () => (
        <div
          onClick={() => Router.push("/seller/products/productreview")}
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
    {
      field: "Edit",
      width: 105,
      cellRenderer: () => (
        <div
          onClick={() => Router.push("/seller/products/add")}
          style={{
            fontSize: "25px",
            color: "var(--theme-color)",
          }}
        >
          <BiEdit style={{ cursor: "pointer" }} />
        </div>
      ),
    },
    {
      field: "Details",
      width: 105,
      cellRenderer: () => (
        <div
          onClick={() => Router.push("/seller/products/sdfsfd")}
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
  const [categories, setCategories] = useState<Category[]>([]);

  const handleCatChange = async (e: FormEvent<HTMLSelectElement>) => {
    try {
      const res = await axios.get<RespondType & { products: ProtuctType[] }>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/products/getProductsWithCat`,
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
          "Item Status": prod.totalStock > 0 ? "In Stock" : "Out of Stock",
        }));
        console.log(res.data);
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

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      (async () => {
        try {
          const res = await axios.get<
            RespondType & { products?: ProtuctType[]; categories: Category[] }
          >(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/products/getAllProducts`,
            { withCredentials: true }
          );

          if (res.data.status === "ok" && res.data.products) {
            const productTable: TableDef[] = res.data.products.map(
              (product, i) => ({
                SN: i + 1,
                Product: product.name,
                "Item Sold": product.timesBought,
                "Item Status":
                  product.totalStock > 0 ? "In Stock" : "Out Of Stock",
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
        } catch {
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

  const searchRef = useRef<HTMLInputElement>(null);
  return (
    <SellerNav>
      <h1>All Products</h1>
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
        <div className={styles.tableContainer}>
          <div className={styles.table}>
            <div className={styles.search}>
              <SearchBar inputRef={searchRef} />
            </div>
            <div className={styles.main}>
              <div
                className={`ag-theme-alpine ${styles.main}`}
                style={{ height: 350, width: 890 }}
              >
                <AgGridReact
                  rowData={rowData}
                  columnDefs={columnDefs}
                ></AgGridReact>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SellerNav>
  );
};

export default AllProducts;
