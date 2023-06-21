import React from "react";
import { MdCancel, MdOutlinePendingActions } from "react-icons/md";
import InfoCard from "./shared/InfoCard";

import styles from "../../styles/components/shared/Admin/OrderingInfo.module.scss";
import { FaTruckMoving } from "react-icons/fa";
import { AiFillCheckCircle } from "react-icons/ai";
import { FcCancel } from "react-icons/fc";

interface Props {
  pendingClick?: () => void;
  processingClick?: () => void;
  deliveredClick?: () => void;
  returnedClick?: () => void;
  pendingCount: number;
  deliveredCount: number;
  processingCount: number;
  returnedCount: number;
}

const OrderingInfo: React.FC<Props> = ({
  pendingClick,
  processingClick,
  deliveredClick,
  returnedClick,
  deliveredCount,
  pendingCount,
  processingCount,
  returnedCount,
}) => (
  <div className={styles.orderingInfo}>
    <div className={styles.group}>
      <InfoCard
        amount={pendingCount}
        title="Orders Pending"
        bgColor="#5494f5"
        onViewClick={pendingClick}
      >
        <MdOutlinePendingActions />
      </InfoCard>
      <InfoCard
        amount={processingCount}
        title="Orders Processing"
        bgColor="#f36868"
        onViewClick={processingClick}
      >
        <FaTruckMoving />
      </InfoCard>
    </div>
    <div className={styles.group}>
      <InfoCard
        amount={deliveredCount}
        title="Orders Delivered"
        bgColor="#00ab77"
        onViewClick={deliveredClick}
      >
        <AiFillCheckCircle />
      </InfoCard>
      <InfoCard
        amount={returnedCount}
        title="Returned Orders"
        bgColor="#cc54de"
        onViewClick={returnedClick}
      >
        <MdCancel />
      </InfoCard>
    </div>
  </div>
);

export default OrderingInfo;
