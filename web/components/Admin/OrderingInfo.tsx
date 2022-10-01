import React from "react";
import { MdOutlinePendingActions } from "react-icons/md";
import InfoCard from "./shared/InfoCard";

import styles from "../../styles/components/shared/Admin/OrderingInfo.module.scss";
import { FaTruckMoving } from "react-icons/fa";
import { AiFillCheckCircle } from "react-icons/ai";

const OrderingInfo: React.FC = () => {
  return (
    <div className={styles.orderingInfo}>
      <InfoCard amount={46} title="Orders Pending" bgColor="#5494f5">
        <MdOutlinePendingActions />
      </InfoCard>
      <InfoCard amount={46} title="Orders Processing" bgColor="#f36868">
        <FaTruckMoving />
      </InfoCard>
      <InfoCard amount={46} title="Orders Delivered" bgColor="#00ab77">
        <AiFillCheckCircle />
      </InfoCard>
    </div>
  );
};

export default OrderingInfo;
