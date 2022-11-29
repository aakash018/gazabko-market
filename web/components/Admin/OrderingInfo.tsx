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
  cancledClick?: () => void;
}

const OrderingInfo: React.FC<Props> = ({
  pendingClick,
  processingClick,
  deliveredClick,
  cancledClick,
}) => (
  <div className={styles.orderingInfo}>
    <InfoCard
      amount={46}
      title="Orders Pending"
      bgColor="#5494f5"
      onViewClick={pendingClick}
    >
      <MdOutlinePendingActions />
    </InfoCard>
    <InfoCard
      amount={46}
      title="Orders Processing"
      bgColor="#f36868"
      onViewClick={processingClick}
    >
      <FaTruckMoving />
    </InfoCard>
    <InfoCard
      amount={46}
      title="Orders Delivered"
      bgColor="#00ab77"
      onViewClick={deliveredClick}
    >
      <AiFillCheckCircle />
    </InfoCard>
    <InfoCard
      amount={46}
      title="Cancled Orders"
      bgColor="#cc54de"
      onViewClick={cancledClick}
    >
      <MdCancel />
    </InfoCard>
  </div>
);

export default OrderingInfo;
