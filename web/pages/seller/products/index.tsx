import { AgGridReact } from "ag-grid-react";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { FaBoxOpen } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import {
  MdOutlineAdd,
  MdReviews,
  MdOutlineReportProblem,
} from "react-icons/md";
import EditOptionsButton from "../../../components/Admin/shared/EditOptionsButton";
import InfoCard from "../../../components/Admin/shared/InfoCard";

import SellerNav from "../../../components/Seller/SellerNav";

import styles from "../../../styles/components/Seller/pages/ProductPage.module.scss";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { BiEdit, BiHide } from "react-icons/bi";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import axios from "axios";
import { ProtuctType } from "../../../@types/global";
import { useAlert } from "../../_app";

type TableDef = {
  SN: number;
  Product: string;
  Rating: number;
  Brand: string;
  "Item Sold": number;
  "Item Status": "In Stock" | "Out of Stock";
  id: number;
};

interface CountRespondType {
  outOfStock: number;
  total: number;
  reviews: number;
  questions: number;
  hiddenProducts: number;
  report: number;
}

const ProductsPage = () => {
  const [rowData, setRowData] = useState<TableDef[]>([]);
  const { setAlert } = useAlert();
  const [columnDefs] = useState([
    { field: "SN", width: 70 },
    { field: "Product", width: 220 },
    { field: "Item Sold", width: 135 },
    { field: "Item Status", width: 135 },
    { field: "Brand", width: 150 },
    { field: "Rating", width: 135 },
  ]);
  const [dataCount, setDataCount] = useState<CountRespondType | null>(null);
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      (async () => {
        const res = await axios.get<RespondType & { products?: ProtuctType[] }>(
          `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/products/topSellingProducts`,
          {
            withCredentials: true,
          }
        );
        if (res.data.status === "ok" && res.data.products) {
          const topProductsTable: TableDef[] = res.data.products.map(
            (product, i) => ({
              SN: i + 1,
              "Item Sold": product.timesBought,
              Product: product.name,
              "Item Status":
                product.totalStock > 0 ? "In Stock" : "Out of Stock",
              Brand: product.brand,
              Rating: product.rating,
              id: product.id,
            })
          );
          setRowData(topProductsTable);
        }
      })();
    }

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get<RespondType & { count?: CountRespondType }>(
          `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/products/getProductsCount`,
          {
            withCredentials: true,
          }
        );

        if (res.data.status === "ok" && res.data.count) {
          setDataCount(res.data.count);
        } else {
          setAlert({
            type: "error",
            message: res.data.message,
          });
        }
      } catch {
        setAlert({
          type: "error",
          message: "failed to load count",
        });
      }
    })();
  }, []);

  const handleInfoCardRoute = (route: string) => {
    Router.push(`/seller/products/${route}`);
  };

  return (
    <SellerNav>
      <h1>Products</h1>
      {!dataCount && <h2>Loading...</h2>}
      {dataCount && (
        <div className={styles.options}>
          <EditOptionsButton
            icon={<MdOutlineAdd />}
            text={"Add Products"}
            bgColor={"#5494F5"}
            onClick={() => {
              handleInfoCardRoute("add");
            }}
          />
          <InfoCard
            amount={dataCount.total}
            bgColor={"#00AB77"}
            title="Total Product"
            onViewClick={() => {
              handleInfoCardRoute("allProducts");
            }}
          >
            <FiPackage />
          </InfoCard>
          <InfoCard
            amount={dataCount.outOfStock}
            bgColor={"#F36868"}
            title="Products out of stock"
            onViewClick={() => {
              handleInfoCardRoute("outOfStock");
            }}
          >
            <FaBoxOpen />
          </InfoCard>
          <InfoCard
            amount={dataCount.reviews}
            bgColor={"#9E1EEC"}
            title="Products Reviews"
            onViewClick={() => {
              handleInfoCardRoute("productReviews");
            }}
          >
            <MdReviews />
          </InfoCard>
          <InfoCard
            amount={dataCount.report}
            bgColor={"#EC1E5C"}
            title="Products Reported"
            onViewClick={() => {
              handleInfoCardRoute("productReports");
            }}
          >
            <MdOutlineReportProblem />
          </InfoCard>
          <InfoCard
            amount={dataCount.questions}
            bgColor={"#9b9e36"}
            title="Questions Asked"
            onViewClick={() => {
              handleInfoCardRoute("questionsAsked");
            }}
          >
            <BsFillPatchQuestionFill />
          </InfoCard>
          <InfoCard
            amount={dataCount.hiddenProducts}
            bgColor={"#a11e3f"}
            title="Hidden Products"
            onViewClick={() => {
              handleInfoCardRoute("hiddenProducts");
            }}
          >
            <BiHide />
          </InfoCard>
        </div>
      )}

      <div className={styles.table}>
        <div className={styles.title}>
          <h2>Top Selling Products</h2>
        </div>
        <div
          className={`ag-theme-alpine ${styles.main}`}
          style={{ height: 400, width: 850 }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            onRowClicked={(event) => {
              if (event.data) {
                Router.push(`/seller/products/id?pid=${event.data.id}`);
              }
            }}
          ></AgGridReact>
        </div>
      </div>
    </SellerNav>
  );
};

export default ProductsPage;
