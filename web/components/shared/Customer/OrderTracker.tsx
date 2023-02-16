import React, { useEffect, useRef } from "react";
import { BsCheck2 } from "react-icons/bs";
import { GiTick } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { Order } from "../../../@types/global";
import styles from "../../../styles/components/shared/Customer/OrderTracker.module.scss";

interface Props {
  orderStatus: Order["status"];
  orderState: Order["state"];
}

const OrderTracker: React.FC<Props> = ({ orderState, orderStatus }) => {
  const colorLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (colorLineRef.current) {
      if (orderStatus === "pending") {
        colorLineRef.current.style.width = "0%";
      } else if (orderStatus === "processing" && orderState === "received") {
        colorLineRef.current.style.width = "35%";
      } else if (
        orderStatus === "processing" &&
        orderState === "outForDelivery"
      ) {
        colorLineRef.current.style.width = "70%";
      } else if (orderStatus === "delivered") {
        colorLineRef.current.style.width = "100%";
      }
    }
  }, [colorLineRef]);

  return (
    <div className={styles.orderTracker}>
      <div className={styles.midLine}>
        <div className={styles.colorPart} ref={colorLineRef}></div>
      </div>

      <div className={styles.tags}>
        <div className={styles.icon}>
          <BsCheck2 />
        </div>
        <div className={styles.text}>Pending</div>
      </div>
      <div className={styles.tags}>
        <div className={styles.icon}>
          {(orderStatus === "processing" && orderState === "received") ||
          orderState === "outForDelivery" ||
          orderStatus === "delivered" ? (
            <BsCheck2 />
          ) : (
            <MdCancel />
          )}
        </div>
        <div className={styles.text}>Shipping</div>
      </div>
      <div className={styles.tags}>
        <div className={styles.icon}>
          {(orderStatus === "processing" && orderState === "outForDelivery") ||
          orderStatus === "delivered" ? (
            <BsCheck2 />
          ) : (
            <MdCancel />
          )}
        </div>
        <div className={styles.text}>Arriving</div>
      </div>
      <div className={styles.tags}>
        <div className={styles.icon}>
          {orderStatus === "delivered" ? <BsCheck2 /> : <MdCancel />}
        </div>
        <div className={styles.text}>Success</div>
      </div>
    </div>
  );
};

export default OrderTracker;
