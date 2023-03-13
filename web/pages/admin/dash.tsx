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
          >(`${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/analytics`, {
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
            console.log(noOfMonthlyOrderLabels);

            const noOfMonthlyOrderData = res.data.noOfOrdersByMonth!.map(
              (ele) => ele.count
            );

            setLoading(false);
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
      <Modal
        isOpen={openModal}
        style={customStyles}
        onRequestClose={() => setOpenModal(false)}
      >
        <TopItemsPopup title="TEXT" items={topItems} />
      </Modal>

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
              onClick={handleClick}
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
              onClick={handleClick}
            />
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
              {monthlyFollowers && (
                <LineGraphInfo
                  amount={231}
                  subTitle="Total Customers Added"
                  labels={monthlyFollowers!.label}
                  data={monthlyFollowers!.data}
                />
              )}
              {noOfMonthlyOrders && (
                <LineGraphInfo
                  amount={311}
                  subTitle="Total Sellers Added"
                  labels={noOfMonthlyOrders!.label}
                  data={noOfMonthlyOrders!.data}
                />
              )}
            </div>
            <div className={styles.bottomRightCards}>
              <Goals />
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default DashPage;
