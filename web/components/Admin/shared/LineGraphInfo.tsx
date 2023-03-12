import React from "react";
import styles from "../../../styles/components/shared/Admin/LineGraphInfo.module.scss";
import { Line } from "react-chartjs-2";

interface Props {
  subTitle: string;
  amount: number;
  labels: string[];
  data: number[];
}

const LineGraphInfo: React.FC<Props> = ({ subTitle, amount, data, labels }) => {
  return (
    <div className={styles.lineGraphInfo}>
      <div className={styles.header}>
        <div className={styles.amount}>{amount}</div>
        <div className={styles.subTitle}>{subTitle}</div>
      </div>
      <div className={styles.chart}>
        <Line
          data={{
            labels: labels,
            datasets: [
              {
                label: subTitle,
                data: data,
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
