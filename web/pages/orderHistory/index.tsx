import axios from "axios";
import React, { useEffect, useState } from "react";
import { Order, ProtuctType } from "../../@types/global";
import OrderHistoryLayout from "../../components/Customer/OrderHistoryLayout";
import OrderHistoryProduct from "../../components/shared/Customer/orderHistoryProduct";
import styles from "../../styles/components/Customer/pages/OrderHistoryPage.module.scss";
import { useAlert } from "../_app";

const OrderHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { setAlert } = useAlert();

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      (async () => {
        try {
          const res = await axios.get<RespondType & { orders?: Order[] }>(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/order/orderHistory`,
            { withCredentials: true }
          );
          console.log(res.data);
          if (res.data.status === "ok" && res.data.orders) {
            setOrders(res.data.orders);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        } catch {
          setAlert({
            type: "error",
            message: "failed to find order",
          });
        }
      })();
    }
    return () => {
      ignore = false;
    };
  }, []);

  return (
    <OrderHistoryLayout>
      <div className={styles.title}>Order History</div>
      {orders.length !== 0 &&
        orders.map((order, i) => (
          <OrderHistoryProduct
            order={order}
            product={order.product as ProtuctType}
            status={order.status}
            key={i}
          />
        ))}
    </OrderHistoryLayout>
  );
};

export default OrderHistoryPage;
