import { Line } from "react-chartjs-2";
import { BiEdit, BiPackage } from "react-icons/bi";
import SellerDashTabs from "../../components/Seller/SellerDashTabs";
import SellerNav from "../../components/Seller/SellerNav";

import styles from "../../styles/components/Seller/pages/Dash.module.scss";

//The category shit in here is real bad. Without it things break.
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import DashInfoHolder from "../../components/Admin/DashInfoHolder";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import LineGraphInfo from "../../components/Admin/shared/LineGraphInfo";
import Router from "next/router";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
Chart.register(CategoryScale);

type TableDef = {
  SN: number;
  Product: string;
  Vendor: string;
  "Item Sold": number;
  "Item Status": "In Stock" | "Out of Stock";
  Edit: any;
  "Hide Item": any;
};

const SellerPage = () => {
  const [rowData] = useState<TableDef[]>([
    {
      SN: 1,
      Product: "xyz",
      Vendor: "xyz",
      "Item Sold": 45,
      "Item Status": "In Stock",
      Edit: "",
      "Hide Item": "",
    },
    {
      SN: 2,
      Product: "xyz",
      Vendor: "xyz",
      "Item Sold": 45,
      "Item Status": "In Stock",
      Edit: "",
      "Hide Item": "",
    },
    {
      SN: 3,
      Product: "xyz",
      Vendor: "xyz",
      "Item Sold": 45,
      "Item Status": "In Stock",
      Edit: "",
      "Hide Item": "",
    },
    {
      SN: 4,
      Product: "xyz",
      Vendor: "xyz",
      "Item Sold": 45,
      "Item Status": "In Stock",
      Edit: "",
      "Hide Item": "",
    },
    {
      SN: 5,
      Product: "xyz",
      Vendor: "xyz",
      "Item Sold": 45,
      "Item Status": "In Stock",
      Edit: "",
      "Hide Item": "",
    },
    {
      SN: 6,
      Product: "xyz",
      Vendor: "xyz",
      "Item Sold": 45,
      "Item Status": "In Stock",
      Edit: "",
      "Hide Item": "",
    },
  ]);

  const [columnDefs] = useState([
    { field: "SN", width: 70 },
    { field: "Product", width: 220 },
    { field: "Item Sold", width: 135 },
    { field: "Item Status", width: 135 },
    {
      field: "Edit",
      width: 120,
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
      width: 135,
    },
  ]);

  return (
    <SellerNav>
      <h1>DashBoard</h1>
      <div className={styles.dash}>
        <div className={styles.infoTabs}>
          <SellerDashTabs
            icon={<BiPackage color="#00AB77" />}
            number={45}
            text="Total units sold"
          />
          <SellerDashTabs
            icon={<BiPackage color="#00AB77" />}
            number={2_254}
            text="Total Sales"
          />
          <SellerDashTabs
            icon={<BiPackage color="#00AB77" />}
            number={535}
            text="Total Profit"
          />
        </div>
        <div className={styles.doughnutCharts}>
          <DashInfoHolder
            totalEarning={37575}
            first={{
              name: "Gazabko Bar",
              amount: 12_500,
            }}
            second={{
              name: "Women’s Fasion",
              amount: 13000,
            }}
            third={{
              name: "Electronic Devices",
              amount: 8000,
            }}
            onClick={() => {}}
          />
          <DashInfoHolder
            totalEarning={314}
            first={{
              name: "NEKO glasses",
              amount: 134,
            }}
            second={{
              name: "5star Wears",
              amount: 45,
            }}
            third={{
              name: "Xiomi 42’ Smart TV",
              amount: 21,
            }}
            onClick={() => {}}
          />
        </div>
        <div className={styles.earningGraph}>
          <span>Your Monthly Sales</span>
          <Line
            className={styles.monthlyGraph}
            data={{
              labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Juy",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              datasets: [
                {
                  label: "Vendor's Monthly Sales",
                  data: [
                    1233, 4545, 4443, 2345, 5678, 2234, 5783, 2255, 8878, 3445,
                    8735, 3455,
                  ],
                  fill: false,
                  borderColor: "rgb(75, 192, 192)",
                  tension: 0.1,
                },
              ],
            }}
          />
        </div>
        <div className={styles.bottomCardsHolder}>
          <div className={styles.customerCard}>
            <LineGraphInfo amount={231} subTitle="Total Followers" />
          </div>
          <div className={styles.customerCard}>
            <LineGraphInfo amount={4.3} subTitle="My Rating" />
          </div>
        </div>
        <div className={styles.topProducts}>
          <div className={styles.container}>
            <span>Top Products</span>
            <div
              className={`ag-theme-alpine ${styles.main}`}
              style={{ height: 350, width: 830 }}
            >
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
              ></AgGridReact>
            </div>
          </div>
        </div>
      </div>
    </SellerNav>
  );
};

export default SellerPage;
