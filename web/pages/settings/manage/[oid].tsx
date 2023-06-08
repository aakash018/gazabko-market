import React, { useEffect, useRef, useState } from "react";
import Layout from "../../../components/Customer/Layout";
import SettingPageSettingHolder from "../../../components/shared/Customer/SettingPageSettingHolder";

import styles from "../../../styles/components/Customer/pages/settings/Manage.module.scss";
import Image from "next/image";
// import Link from "next/link";
import Button from "../../../components/shared/Button";
import { useRouter } from "next/router";
import { BsStarFill } from "react-icons/bs";
import InputField from "../../../components/shared/Input";
import axios from "axios";
import { useAlert } from "../../_app";
import { Order } from "../../../@types/global";
import { Rating } from "react-simple-star-rating";
import { GiCancel, GiHamburgerMenu } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";

const UserInput: React.FC<{
  title: "Review" | "Return" | "Report";
  order: Order;
}> = ({ title, order }) => {
  const reviewRef = useRef<HTMLTextAreaElement>(null);
  const returnRef = useRef<HTMLTextAreaElement>(null);
  const reportRef = useRef<HTMLTextAreaElement>(null);
  // const [loading, setLoading] = useState(false);
  const [reportSubject, setReportSubject] = useState("");
  const router = useRouter();
  const { oid } = router.query;
  const { setAlert } = useAlert();

  const [rating, setRating] = React.useState(0);

  const onRatingChange = (score: number) => {
    setRating(score);
  };

  const handleReviewSubmit = async () => {
    if (reviewRef.current && reviewRef.current.value.trim() !== "") {
      const payload = {
        pid: (order as any).product.id,
        review: reviewRef.current.value,
        rating: rating,
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
          oid,
          message: returnRef.current?.value,
        },
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
        message: "failed to connect to server",
      });
    }
  };

  const handleReportRequest = async () => {
    try {
      const res = await axios.post<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/rrr/addReport`,
        {
          title: reportSubject,
          report: reportRef.current?.value,
          pid: (order as any).product.id,
        },
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
    } catch (e) {
      console.log(e);
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
                <Rating onClick={onRatingChange} transition />
              </div>
            )}
          </div>
        </div>
        {title === "Report" && (
          <div style={{ width: "350px" }}>
            <InputField
              placeholder="Subject"
              setState={setReportSubject}
              value={reportSubject}
            />
          </div>
        )}

        {title === "Return" && order.return?.requestAccepted ? (
          <h3>Your return request has been accepted</h3>
        ) : title === "Return" && order.return?.requestRejected ? (
          <h3>
            Your request was rejected. Please contact admins for further details
          </h3>
        ) : (
          <>
            <textarea
              placeholder={
                title !== "Review" ? "write a message" : "write review"
              }
              ref={
                title === "Review"
                  ? reviewRef
                  : title === "Report"
                  ? reportRef
                  : returnRef
              }
            ></textarea>
            <Button
              onClick={() => {
                if (title === "Review") {
                  handleReviewSubmit();
                } else if (title === "Return") {
                  handleReturnRequest();
                } else {
                  handleReportRequest();
                }
              }}
            >
              {title === "Return" ? "Send Return Request" : "Post"}
            </Button>
          </>
        )}
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
  const [showMobileNav, setShowMobileNav] = useState(false);
  const { oid } = router.query;
  const { setAlert } = useAlert();
  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        setLoading(true);
        const res = await axios.get<RespondType & { order?: Order }>(
          `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/order/orderDetails`,
          { withCredentials: true, params: { oid } }
        );

        setLoading(false);
        if (res.data.order && res.data.status === "ok") {
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
      {!loading &&
        order &&
        order.status !== "delivered" &&
        !order.canceledBySeller && (
          <h2
            style={{
              height: "400px",
              display: "grid",
              placeContent: "center  ",
            }}
          >
            Product hasn't been delivered yet
          </h2>
        )}
      {!loading && order && order.canceledBySeller && (
        <h2
          style={{ height: "400px", display: "grid", placeContent: "center  " }}
        >
          Order was canceled by the seller
        </h2>
      )}
      {!loading &&
        order &&
        order.status === "delivered" &&
        !order.canceledBySeller && (
          <div className={styles.manage}>
            <div
              className={styles.menuIcon}
              onClick={() => setShowMobileNav((prev) => !prev)}
            >
              <GiHamburgerMenu />
            </div>
            <div
              className={`${styles.options} ${
                showMobileNav ? styles.optionsActive : ""
              }`}
            >
              <div
                className={styles.menuCancel}
                onClick={() => setShowMobileNav(false)}
              >
                <GiCancel />
              </div>
              <SettingPageSettingHolder
                title="Review"
                subtitle="write reviews"
                onClick={() => {
                  setSelectedPage("Review");
                  setShowMobileNav(false);
                }}
              />
              <SettingPageSettingHolder
                title="Return"
                subtitle="return product"
                onClick={() => {
                  setSelectedPage("Return");
                  setShowMobileNav(false);
                }}
              />
              <SettingPageSettingHolder
                title="Report"
                subtitle="report product"
                onClick={() => {
                  setSelectedPage("Report");
                  setShowMobileNav(false);
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
