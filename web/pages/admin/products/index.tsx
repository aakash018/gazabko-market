import React, { useEffect, useState } from "react";

import styles from "../../../styles/components/Admin/pages/EditProducts.module.scss";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import {
  MdOutlineAdd,
  MdOutlineReportProblem,
  MdReviews,
} from "react-icons/md";

import { FiPackage } from "react-icons/fi";
import { FaBoxOpen } from "react-icons/fa";
import { AgGridReact } from "ag-grid-react";
import Router from "next/router";
import { BiEdit } from "react-icons/bi";
import AdminLayout from "../../../components/Admin/AdminNav";
import EditOptionsButton from "../../../components/Admin/shared/EditOptionsButton";
import InfoCard from "../../../components/Admin/shared/InfoCard";
import axios from "axios";
import { setDefaultResultOrder } from "dns";
import { useAlert } from "../../_app";
import { ProtuctType } from "../../../@types/global";
import { BsEyeSlashFill } from "react-icons/bs";

type TableDef = {
  SN: number;
  Product: string;
  Vendor: string;
  "Item Sold": number;
  "Item Status": "In Stock" | "Out of Stock";
  Edit: any;
  Details: any;
  id: number;
};

interface CountResponse {
  allProductsCount: number;
  reviewsCount: number;
  reportsCount: number;
  outOfStockCount: number;
  hiddenCount: number;
}

const EditProducts: React.FC = () => {
  const [rowData, setRowData] = useState<TableDef[]>([]);

  const { setAlert } = useAlert();
  const [counts, setCounts] = useState<CountResponse | null>(null);

  const [columnDefs] = useState([
    { field: "SN", width: 70 },
    { field: "Product", width: 220 },
    { field: "Vendor", width: 220 },
    { field: "Item Sold", width: 135 },
    { field: "Item Status", width: 135 },
    {
      field: "Edit",
      width: 135,
      cellRenderer: () => (
        <div
          onClick={() => Router.push("/admin/products/add")}
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
      cellRenderer: () => (
        <div
          style={{
            fontWeight: "bold",
            color: "var(--theme-color)",
            cursor: "pointer",
          }}
        >
          View
        </div>
      ),
      width: 135,
    },
  ]);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      (async () => {
        try {
          const resCounts = await axios.get<
            RespondType & { counts?: CountResponse }
          >(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/getCounts/getProductCounts`,
            {
              withCredentials: true,
            }
          );

          if (resCounts.data.status === "ok" && resCounts.data.counts) {
            setCounts(resCounts.data.counts);
          } else {
            setAlert({
              type: "error",
              message: resCounts.data.message,
            });
          }

          const res = await axios.get<
            RespondType & { topProducts?: ProtuctType[] }
          >(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/products/topProducts`,
            {
              withCredentials: true,
            }
          );

          if (res.data.status === "ok" && res.data.topProducts) {
            const productForTable: TableDef[] = res.data.topProducts.map(
              (product, i) => ({
                SN: i + 1,
                Product: product.name,
                Vendor: product.store as string,
                "Item Sold": product.timesBought,
                "Item Status":
                  product.totalStock === 0 ? "Out of Stock" : "In Stock",
                Edit: "",
                Details: "",
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
    }

    return () => {
      ignore = false;
    };
  }, []);

  const handleInfoCardRoute = (route: string) => {
    Router.push(`/admin/products/${route}`);
  };

  return (
    <AdminLayout>
      <div className={styles.editProducts}>
        <div>
          <h1>Edit Products</h1>
        </div>
        <div className={styles.options}>
          {counts && (
            <>
              {" "}
              <EditOptionsButton
                icon={<MdOutlineAdd />}
                text={"Add Products"}
                bgColor={"#5494F5"}
                onClick={() => {
                  handleInfoCardRoute("add");
                }}
              />
              <InfoCard
                amount={counts.allProductsCount}
                bgColor={"#00AB77"}
                title="Total Product"
                onViewClick={() => {
                  handleInfoCardRoute("allProducts");
                }}
              >
                <FiPackage />
              </InfoCard>
              <InfoCard
                amount={counts.outOfStockCount}
                bgColor={"#F36868"}
                title="Products out of stock"
                onViewClick={() => {
                  handleInfoCardRoute("outOfStock");
                }}
              >
                <FaBoxOpen />
              </InfoCard>
              <InfoCard
                amount={counts.reviewsCount}
                bgColor={"#9E1EEC"}
                title="Products Reviews"
                onViewClick={() => {
                  handleInfoCardRoute("productReviews");
                }}
              >
                <MdReviews />
              </InfoCard>
              <InfoCard
                amount={counts.reportsCount}
                bgColor={"#EC1E5C"}
                title="Products Reported"
                onViewClick={() => {
                  handleInfoCardRoute("productReports");
                }}
              >
                <MdOutlineReportProblem />
              </InfoCard>
              <InfoCard
                amount={counts.hiddenCount}
                bgColor={"#48bdbd"}
                title="Hidden Products"
                onViewClick={() => {
                  handleInfoCardRoute("hiddenProducts");
                }}
              >
                <BsEyeSlashFill />
              </InfoCard>{" "}
            </>
          )}
        </div>
        <div className={styles.table}>
          <div className={styles.title}>
            <h2>Top Selling Products</h2>
          </div>
          <div
            className={`ag-theme-alpine ${styles.main}`}
            style={{ height: 400, width: "100%" }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              onCellClicked={(e) => {
                if (e.colDef.field === "Details") {
                  Router.push(`/admin/products/id?pid=${e.data?.id}`);
                }
              }}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditProducts;
