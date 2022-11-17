import React, { useState } from "react";
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

const DashPage: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    setOpenModal(true);
  };

  return (
    <AdminLayout>
      <Modal
        isOpen={openModal}
        style={customStyles}
        onRequestClose={() => setOpenModal(false)}
      >
        <TopItemsPopup title="TEXT" items={topItems} />
      </Modal>
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
          <OrderingInfo />
        </div>
        <div className={styles.earningGraph}>
          <span>Monthly Sales</span>
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
                  label: "Monthly Sales",
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
        <div className={styles.bottomCards}>
          <div className={styles.bottomLeftCards}>
            <LineGraphInfo amount={231} subTitle="Total Customers Added" />
            <LineGraphInfo amount={311} subTitle="Total Sellers Added" />
          </div>
          <div className={styles.bottomRightCards}>
            <Goals />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashPage;
