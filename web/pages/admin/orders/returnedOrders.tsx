import Router from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { TableHolder } from ".";
import AdminLayout from "../../../components/Admin/AdminNav";
import styles from "../../../styles/components/Admin/pages/returnedOrder.module.scss";

import Image from "next/image";
import Button from "../../../components/shared/Button";
import { Order, ReturnMessageType } from "../../../@types/global";
import axios from "axios";
import { useAlert } from "../../_app";
interface TableDef {
  SN: number;
  Product: string;
  Buyer: string;
  Quntity: number;
  "Order No": number;
  Status: "Verified" | "Not Verified";
}
interface ReturnedMmessageProps {
  img: string;
  name: string;
  message: string;
  onAccept?: () => void;
  onCancel?: () => void;
  orderID: any;
  user: User;
  orderAccepted: boolean;
  orderRejected: boolean;
}
const ReturnMessageHolder: React.FC<ReturnedMmessageProps> = ({
  img,
  message,
  name,
  onAccept,
  onCancel,
  orderID,
  user,
  orderAccepted,
  orderRejected,
}) => {
  return (
    <div className={styles.returnMessageHolder}>
      <div className={styles.product}>
        <div className={styles.image}>
          <Image src={img} width={50} height={50} />
        </div>
        <div className={styles.productInfo}>{name}</div>
        <div
          onClick={() => {
            Router.push(`/admin/orders/id?oid=${orderID}`);
          }}
          style={{
            cursor: "pointer",
            color: "var(--theme-color)",
          }}
        >
          View order
        </div>
      </div>
      <div className={styles.messageContainer}>
        <div className={styles.user}>
          <Image src={user.avatar} width={50} height={50} />
          <div className={styles.name}>
            {user.firstName} {user.lastName}
          </div>
        </div>
        <div className={styles.message}>{message}</div>
      </div>
      {orderAccepted === false && orderRejected === false && (
        <div className={styles.actBtn}>
          <Button onClick={onAccept}>Accept</Button>
          <Button onClick={onCancel} color="error">
            Cancel
          </Button>
        </div>
      )}
      {orderAccepted && <h2>Request has been accepted</h2>}
      {orderRejected && <h2>Request has been rejected</h2>}
    </div>
  );
};

const Pending: React.FC = () => {
  const searchRef = useRef<HTMLInputElement>(null);

  const [returnedOrders, setReturnedOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const { setAlert } = useAlert();

  const fetchPageData = async () => {
    try {
      setLoading(true);
      const res = await axios.get<RespondType & { returns: Order[] }>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/orders/returnedOrders`,
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      console.log(res.data);
      if (res.data.status === "ok") {
        setReturnedOrders(res.data.returns);
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setLoading(false);
      setAlert({
        type: "error",
        message: "failed to connect to server",
      });
    }
  };

  useEffect(() => {
    let ignore = false;
    if (ignore) return;
    fetchPageData();
    return () => {
      ignore = true;
    };
  }, []);

  const handleAcceptRequest = async (rid: string) => {
    try {
      const res = await axios.put<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/orders/acceptReturn`,
        {
          returnid: rid,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.status === "ok") {
        fetchPageData();
        setAlert({
          type: "message",
          message: res.data.message,
        });
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch (e) {
      console.log(e);
      setAlert({
        type: "error",
        message: "failed to connect to server",
      });
    }
  };

  return (
    <AdminLayout>
      <h1>Returned Orders</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        {loading && <h2>Loading...</h2>}
        {!loading && returnedOrders.length === 0 && (
          <h2>No any returned orders</h2>
        )}
        {!loading &&
          returnedOrders.length !== 0 &&
          returnedOrders.map((order, i) => {
            if (order.return)
              return (
                <ReturnMessageHolder
                  key={i}
                  img={"/images/shoes2.webp"}
                  name={order.product!.name}
                  message={order.return!.message}
                  onAccept={() => handleAcceptRequest(order.return!.id)}
                  onCancel={() => {}}
                  orderID={order.id}
                  user={(order as any).user}
                  orderAccepted={order.return.requestAccepted}
                  orderRejected={order.return.requestRejected}
                />
              );
          })}
      </div>
    </AdminLayout>
  );
};

export default Pending;
