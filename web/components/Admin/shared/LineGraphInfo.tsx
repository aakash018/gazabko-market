import React from "react";
import styles from "../../../styles/components/shared/Admin/LineGraphInfo.module.scss";
import { Line } from "react-chartjs-2";

interface Props {
  subTitle: string;
  amount?: number | string;
  labels: string[];
  data: number[];
  style?: React.CSSProperties;
}

const LineGraphInfo: React.FC<Props> = ({
  subTitle,
  amount,
  data,
  labels,
  style,
}) => {
  return (
    <div className={styles.lineGraphInfo}>
      <div className={styles.header}>
        <div className={styles.amount}>{amount}</div>
        <div className={styles.subTitle}>{subTitle}</div>
      </div>
      <div className={styles.chart}>
        <Line
          // width={400}
          // height={300}
          style={style}
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
