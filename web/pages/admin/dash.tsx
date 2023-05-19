import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/Admin/AdminNav";
import DashInfoHolder from "../../components/Admin/DashInfoHolder";

import { Line } from "react-chartjs-2";

import styles from "../../styles/components/Admin/pages/DashPage.module.scss";
import LineGraphInfo from "../../components/Admin/shared/LineGraphInfo";
import Goals from "../../components/Admin/Goals";

import Modal from "react-modal";
import TopItemsPopup from "../../components/Admin/TopItemsPopup";
import { customStyles } from "../../modalStyle";
import OrderingInfo from "../../components/Admin/OrderingInfo";
import DashSearchBar from "../../components/Admin/DashSearchBar";
import { adminPageSearchData } from "../../adminPageSearchData";
import { useAlert } from "../_app";
import axios from "axios";
import Router from "next/router";

const topItems = [
  {
    name: "rando xyz",
    amount: 10,
  },
  {
    name: "rando xyz",
    amount: 10,
  },
  {
    name: "rando xyz",
    amount: 10,
  },
  {
    name: "rando xyz",
    amount: 10,
  },
  {
    name: "rando xyz",
    amount: 10,
  },
  {
    name: "rando xyz",
    amount: 10,
  },
];

interface orderWithMonth {
  date: Date;
  count: number;
}
const DashPage: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    setOpenModal(true);
  };

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

  const [countLoading, setCountLoading] = useState(false);

  const [ordersCount, setOrdersCount] = useState<{
    pending: number;
    processing: number;
    delivered: number;
    returned: number;
  } | null>(null);

  const [topProductsCount, setTopProductsCount] = useState<
    [{ [key: string]: number }, string[]] | null
  >(null);

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
              mostBoughtProductCount?: {
                [key: string]: number;
              };
            }
          >(`${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/analytics`, {
            withCredentials: true,
          });

          if (
            res.data.status === "ok" &&
            res.data.orderWithMonth &&
            res.data.followersWithMonth &&
            res.data.mostBoughtProductCount
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
            console.log(noOfMonthlyOrderLabels);

            const noOfMonthlyOrderData = res.data.noOfOrdersByMonth!.map(
              (ele) => ele.count
            );

            setLoading(false);

            setTopProductsCount([
              res.data.mostBoughtProductCount,
              Object.keys(res.data.mostBoughtProductCount),
            ]);

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
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        } catch (error) {}
      })();

      (async () => {
        try {
          setCountLoading(true);
          const res = await axios.get<
            RespondType & {
              counts?: {
                pending: number;
                processing: number;
                delivered: number;
                returned: number;
              };
            }
          >(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/getCounts/getOrdersCount`,
            { withCredentials: true }
          );
          setCountLoading(false);

          if (res.data.status === "ok" && res.data.counts) {
            setOrdersCount(res.data.counts);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        } catch {
          setAlert({
            type: "error",
            message: "failed to load orders count",
          });
        }
      })();
    }
  }, []);

  return (
    <AdminLayout>
      {loading && <h2>Loading...</h2>}
      {!loading && (
        <div className={styles.dash}>
          <div
            style={{
              width: "50%",
              alignSelf: "flex-start",
              marginLeft: "50px",
            }}
          >
            <DashSearchBar pageLayoutData={adminPageSearchData} />
          </div>
          <div className={styles.doughnutCharts}>
            {/* <DashInfoHolder
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
              onClick={handleClick}
            /> */}
            {topProductsCount && (
              <DashInfoHolder
                title="Most Sold Products"
                totalEarning={314}
                first={{
                  name: topProductsCount[1][0],
                  amount: `${topProductsCount[0][topProductsCount[1][0]]}`,
                }}
                second={{
                  name: topProductsCount[1][1],
                  amount: `${topProductsCount[0][topProductsCount[1][1]]}`,
                }}
                third={{
                  name: topProductsCount[1][2],
                  amount: `${topProductsCount[0][topProductsCount[1][2]]}`,
                }}
                onClick={() => {}}
              />
            )}
          </div>
          <div className={styles.ordersDetains}>
            {countLoading && <h2>Loading...</h2>}
            {!countLoading && ordersCount && (
              <OrderingInfo
                deliveredCount={ordersCount!.delivered}
                pendingCount={ordersCount!.pending}
                returnedCount={ordersCount!.returned}
                processingCount={ordersCount!.processing}
                processingClick={() => {
                  Router.push("/admin/orders/processing");
                }}
                deliveredClick={() => {
                  Router.push("/admin/orders/delivered");
                }}
                pendingClick={() => {
                  Router.push("/admin/orders/pending");
                }}
                returnedClick={() => {
                  Router.push("/admin/orders/returnedOrders");
                }}
              />
            )}
          </div>
          <div className={styles.earningGraph}>
            <span>Monthly Sales</span>
            <Line
              className={styles.monthlyGraph}
              data={{
                labels: monthlyOrder?.label,
                datasets: [
                  {
                    label: "Monthly Sales",
                    data: monthlyOrder?.data,
                    fill: false,
                    borderColor: "rgb(75, 192, 192)",
                    tension: 0.1,
                  },
                ],
              }}
            />
          </div>
          <div className={styles.bottomCards}>
            <div className={styles.bottomLeftCards}>
              {!monthlyFollowers && <h2>Data Not Found</h2>}
              <div>
                {monthlyFollowers && (
                  <LineGraphInfo
                    // amount={231}
                    subTitle="Total Customers Added"
                    labels={monthlyFollowers!.label}
                    data={monthlyFollowers!.data}
                  />
                )}
              </div>
              <div>
                {noOfMonthlyOrders && (
                  <LineGraphInfo
                    // amount={311}
                    subTitle="Total Sellers Added"
                    labels={noOfMonthlyOrders!.label}
                    data={noOfMonthlyOrders!.data}
                  />
                )}
              </div>
            </div>
            {/* <div className={styles.bottomRightCards}>
              <Goals />
            </div> */}
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default DashPage;
