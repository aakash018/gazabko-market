import React, { useEffect, useRef, useState } from "react";
import Layout from "../../../components/Customer/Layout";
import SettingPageSettingHolder from "../../../components/shared/Customer/SettingPageSettingHolder";

import styles from "../../../styles/components/Customer/pages/settings/Manage.module.scss";
import Image from "next/image";
import Link from "next/link";
import Button from "../../../components/shared/Button";
import Router, { useRouter } from "next/router";
import { BsStarFill } from "react-icons/bs";
import InputField from "../../../components/shared/Input";
import axios from "axios";
import { useAlert } from "../../_app";
import { Order } from "../../../@types/global";

const UserInput: React.FC<{
  title: "Review" | "Return" | "Report";
  order: Order;
}> = ({ title, order }) => {
  const reviewRef = useRef<HTMLTextAreaElement>(null);
  const returnRef = useRef<HTMLTextAreaElement>(null);
  const reportRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { pid } = router.query;
  const { setAlert } = useAlert();

  const handleSubmit = async () => {
    if (reviewRef.current && reviewRef.current.value.trim() !== "") {
      const payload = {
        pid: (order as any).product.id,
        review: reviewRef.current.value,
        rating: 4.5,
      };
      try {
        const res = await axios.post<RespondType>(
          `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/rrr/review`,
          payload,
          { withCredentials: true }
        );

        if (res.data.status === "ok") {
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
      } catch {
        setAlert({
          type: "error",
          message: "error posting review",
        });
      }
    } else {
      console.log(reviewRef.current);
    }
  };

  const handleReturnRequest = async () => {
    try {
      const res = await axios.post<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/rrr/returnProduct`,
        {
          oid: pid,
          message: reportRef.current?.value,
        }
      );
      if (res.data.status === "ok") {
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
    } catch {
      setAlert({
        type: "error",
        message: "failed to connect to server",
      });
    }
  };

  return (
    <div className={styles.review}>
      <h2>{title}</h2>
      <div className={styles.review}>
        <div>{order.created_at.split("T")[0]}</div>
        <div className={styles.products}>
          <Image src={"/images/shoes2.webp"} width={100} height={100} />
          <div>
            <div>{(order as any).product.name}</div>
            <div>Color: {order.color || "N/A"}</div>
            <div>Size: {order.size || "N/A"}</div>
            {title === "Review" && (
              <div className={styles.rating}>
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
              </div>
            )}
          </div>
        </div>
        {title === "Report" && (
          <div style={{ width: "350px" }}>
            <InputField placeholder="Subject" />
          </div>
        )}
        <textarea
          placeholder={title !== "Review" ? "write a message" : "write review"}
          ref={
            title === "Review"
              ? reviewRef
              : title === "Report"
              ? returnRef
              : reportRef
          }
        ></textarea>
        <Button
          onClick={() => {
            if (title === "Review") {
              handleSubmit();
            } else if (title === "Return") {
              handleReturnRequest();
            } else {
            }
          }}
        >
          {title === "Return" ? "Send Return Request" : "Post"}
        </Button>
      </div>
    </div>
  );
};

const Manage = () => {
  const [selectedPage, setSelectedPage] = useState<
    "Review" | "Return" | "Report"
  >("Review");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { pid } = router.query;
  const { setAlert } = useAlert();
  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        setLoading(true);
        const res = await axios.get<RespondType & { order?: Order }>(
          `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/order/orderDetails`,
          { withCredentials: true, params: { oid: pid } }
        );
        setLoading(false);
        if (res.data.order && res.data.status === "ok") {
          console.log(res.data.order);
          setOrder(res.data.order);
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
    })();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Layout>
      {loading && <h2>Loading....</h2>}
      {!loading && !order && <h2>Failed...</h2>}
      {!loading && order && order.status !== "delivered" && (
        <h2
          style={{ height: "400px", display: "grid", placeContent: "center  " }}
        >
          Product hasn't been delivered yet
        </h2>
      )}
      {!loading && order && order.status === "delivered" && (
        <div className={styles.manage}>
          <div className={styles.options}>
            <SettingPageSettingHolder
              title="Review"
              subtitle="write reviews"
              onClick={() => {
                setSelectedPage("Review");
              }}
            />
            <SettingPageSettingHolder
              title="Return"
              subtitle="return product"
              onClick={() => {
                setSelectedPage("Return");
              }}
            />
            <SettingPageSettingHolder
              title="Report"
              subtitle="report product"
              onClick={() => {
                setSelectedPage("Report");
              }}
            />
          </div>
          <div className={styles.content}>
            <UserInput title={selectedPage} order={order} />
          </div>
        </div>
      )}{" "}
    </Layout>
  );
};

export default Manage;
