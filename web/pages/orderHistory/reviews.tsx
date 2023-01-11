import React, { useEffect, useState } from "react";
import Image from "next/image";
import OrderHistoryLayout from "../../components/Customer/OrderHistoryLayout";
import styles from "../../styles/components/Customer/pages/OrderHistoryPage.module.scss";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import axios from "axios";
import { ReviewType } from "../../@types/rrr";
import { useAlert } from "../_app";

const Review = ({ rating, review }: { rating: number; review: string }) => {
  return (
    <div>
      <div>
        <section
          style={{
            color: "var(--default-yellow)",
            marginTop: "5px",
            fontSize: "16px",
          }}
        >
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStarHalf />
          <span style={{ color: "var(--theme-color)", marginLeft: "5px" }}>
            {rating}
          </span>
        </section>
      </div>
      <section
        style={{ marginTop: "5px", fontSize: "13px", lineHeight: "1.7em" }}
      >
        {review}
      </section>
    </div>
  );
};

const OrderHistoryPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const { setAlert } = useAlert();
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      try {
        (async () => {
          setLoading(true);
          const res = await axios.get<RespondType & { reviews?: ReviewType[] }>(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/rrr/getAllReviews`,
            { withCredentials: true }
          );
          setLoading(false);
          if (res.data.status === "ok" && res.data.reviews) {
            setReviews(res.data.reviews);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        })();
      } catch {
        setAlert({
          type: "error",
          message: "failed to load reviews",
        });
      }
    }
  }, []);

  return (
    <OrderHistoryLayout>
      <div className={styles.title}>My Reviews</div>
      {loading && <h2>Loading...</h2>}
      {!loading && reviews.length === 0 && <h2>No reviews found</h2>}
      {!loading &&
        reviews.length !== 0 &&
        reviews.map((review, i) => (
          <>
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                width: "100%",
                gap: "20px",
                backgroundColor: "#eee",
                padding: "20px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "150px",
                  height: "150px",
                }}
              >
                <Image
                  src={"/images/shoes.jpg"}
                  layout="fill"
                  priority={true}
                  objectFit="cover"
                />
              </div>
              <div style={{ width: "calc(100% - 100px)" }}>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 500,
                    marginBottom: "5px",
                  }}
                >
                  {review.product?.name}
                </div>
                <Review rating={review.rating} review={review.review} />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                width: "100%",
                gap: "20px",
                backgroundColor: "#eee",
                padding: "20px",
              }}
            ></div>
          </>
        ))}
    </OrderHistoryLayout>
  );
};

export default OrderHistoryPage;
