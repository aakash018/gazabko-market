import React from "react";
import styles from "../../styles/components/Admin/Goals.module.scss";
import Button from "../shared/Button";
import GoalsTracker from "./shared/GoalsTracker";

const Goals: React.FC = () => {
  return (
    <div className={styles.goals}>
      <div className={styles.title}>Goals for the month</div>
      <div className={styles.trackers}>
        <GoalsTracker title="New Customers" total={210} value={170} />
        <GoalsTracker title="New Sellers" total={180} value={76} />
        <GoalsTracker title="New Visiters" total={320} value={240} />
        <GoalsTracker title="Monthly Earnings" total={2104} value={170} />
        <GoalsTracker title="Monthly Product Sells" total={314} value={80} />
      </div>
      <div className={styles.actionBtns}>
        <Button>ADD</Button>
        <Button>EDIT</Button>
      </div>
    </div>
  );
};

export default Goals;
