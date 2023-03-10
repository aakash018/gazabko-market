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
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import DashSearchBar from "../../components/Admin/DashSearchBar";
import { selllerPageLayoutData } from "../../sellerPageLayoutData";
import axios from "axios";
import { useAlert } from "../_app";
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

interface orderWithMonth {
  date: Date;
  count: number;
}

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

  const [loading, setLoading] = useState(false);
  const { setAlert } = useAlert();
  const [monthlyOrder, setMonthlyOrder] = useState<{
    label: string[];
    data: number[];
  }>();
  const [monthlyFollowers, setMonthlyFollower] = useState<{
    label: string[];
    data: number[];
  }>();
  const [noOfMonthlyOrders, setNoOfMonthlyOrders] = useState<{
    label: string[];
    data: number[];
  }>();
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      (async () => {
        try {
          const labels = [
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
          ];
          setLoading(true);
          const res = await axios.get<
            RespondType & {
              orderWithMonth?: orderWithMonth[];
              followersWithMonth?: orderWithMonth[];
              noOfOrdersByMonth?: orderWithMonth[];
            }
          >(`${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/analytics`, {
            withCredentials: true,
          });
          if (
            res.data.status === "ok" &&
            res.data.orderWithMonth &&
            res.data.followersWithMonth
          ) {
            const monthlyDataLabels = res.data.orderWithMonth.map(
              (ele) => labels[new Date(ele.date).getMonth()]
            );

            const monthlyOrderData = res.data.orderWithMonth.map(
              (ele) => ele.count
            );

            const monthlyFolllowerLabels = res.data.followersWithMonth.map(
              (ele) => labels[new Date(ele.date).getMonth()]
            );

            const monthlyFollowersData = res.data.followersWithMonth.map(
              (ele) => ele.count
            );

            const noOfMonthlyOrderLabels = res.data.noOfOrdersByMonth!.map(
              (ele) => labels[new Date(ele.date).getMonth()]
            );

            const noOfMonthlyOrderData = res.data.noOfOrdersByMonth!.map(
              (ele) => ele.count
            );

            setMonthlyOrder({
              data: monthlyOrderData,
              label: monthlyDataLabels,
            });

            setMonthlyFollower({
              data: monthlyFollowersData,
              label: monthlyFolllowerLabels,
            });

            setNoOfMonthlyOrders({
              data: noOfMonthlyOrderData,
              label: noOfMonthlyOrderLabels,
            });

            setLoading(false);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        } catch (error) {
          console.log(error);
          setAlert({
            type: "error",
            message: "failed to connect to server",
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
      <h1>DashBoard</h1>
      {loading && <h2>Loading...</h2>}
      {!loading && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "50%",
              }}
            >
              <DashSearchBar pageLayoutData={selllerPageLayoutData} />
            </div>
          </div>
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
                  labels: monthlyOrder?.label,
                  datasets: [
                    {
                      label: "Vendor's Monthly Sales",
                      data: monthlyOrder?.data,
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
                {!monthlyFollowers && <h2>Data not found</h2>}
                {monthlyFollowers && (
                  <LineGraphInfo
                    amount={231}
                    subTitle="Total Followers"
                    labels={monthlyFollowers!.label}
                    data={monthlyFollowers!.data}
                  />
                )}
              </div>

              <div className={styles.customerCard}>
                {!noOfMonthlyOrders && <h2>Data not found</h2>}
                {noOfMonthlyOrders && (
                  <LineGraphInfo
                    amount={4.3}
                    subTitle="My Orders"
                    labels={noOfMonthlyOrders!.label}
                    data={noOfMonthlyOrders!.data}
                  />
                )}
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
        </>
      )}
    </SellerNav>
  );
};

export default SellerPage;
