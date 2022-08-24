import React from "react";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

import styles from "../../styles/components/Admin/DashInfoHolder.module.scss";

type TopItemsType = {
  name: string;
  amount: number;
};

interface Props {
  totalEarning: number;
  first: TopItemsType;
  second: TopItemsType;
  third: TopItemsType;
  onClick: () => void;
}

const DashInfoHolder: React.FC<Props> = ({
  totalEarning,
  first,
  second,
  third,
  onClick,
}) => {
  return (
    <div>
      <div className={styles.chartContainer} onClick={onClick}>
        <div className={styles.info}>
          <div className={styles.totals}>
            <div className={styles.amount}>Rs. {totalEarning}</div>
            <div className={styles.subTitle}>Total Month Earning</div>
          </div>
          <div className={styles.topItems}>
            <ul>
              <li>
                <div className={styles.label}>
                  <div className={styles.first}></div>
                  <span className={styles.item}>{first.name}</span>
                </div>
                <span className={styles.amount}>Rs {first.amount}</span>
              </li>
              <li>
                <div className={styles.label}>
                  <div className={styles.second}></div>
                  <span className={styles.item}>{second.name}</span>
                </div>
                <span className={styles.amount}>Rs {second.amount}</span>
              </li>
              <li>
                <div className={styles.label}>
                  <div className={styles.third}></div>
                  <span className={styles.item}>{third.name}</span>
                </div>
                <span className={styles.amount}>Rs {third.amount}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.chart}>
          <Doughnut
            data={{
              labels: [first.name, second.name, third.name],
              datasets: [
                {
                  label: "My First Dataset",
                  data: [first.amount, second.amount, third.amount],
                  backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)",
                  ],
                  hoverOffset: 4,
                },
              ],
            }}
            options={{ plugins: { legend: { display: false } } }}
          />
        </div>
      </div>
    </div>
  );
};

export default DashInfoHolder;
