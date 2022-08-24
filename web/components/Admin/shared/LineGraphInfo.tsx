import React from "react";
import styles from "../../../styles/components/shared/Admin/LineGraphInfo.module.scss";
import { Line } from "react-chartjs-2";

interface Props {
  subTitle: string;
  amount: number;
}

const LineGraphInfo: React.FC<Props> = ({ subTitle, amount }) => {
  return (
    <div className={styles.lineGraphInfo}>
      <div className={styles.header}>
        <div className={styles.amount}>{amount}</div>
        <div className={styles.subTitle}>{subTitle}</div>
      </div>
      <div className={styles.chart}>
        <Line
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
                label: "Total Customer",
                data: [13, 44, 34, 15, 56, 34, 83, 25, 88, 35, 35, 35],
                fill: false,
                borderColor: "rgb(255, 99, 132)",
                tension: 0.1,
              },
            ],
          }}
          options={{ plugins: { legend: { display: false } } }}
        />
      </div>
    </div>
  );
};

export default LineGraphInfo;
