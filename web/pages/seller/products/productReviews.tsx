import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReviewType } from "../../../@types/rrr";
import ProductReviewHolder from "../../../components/Admin/shared/ProductReviewHolder";
import ProductReviewsHolder from "../../../components/Admin/shared/ProductReviewsHolder";
import SellerNav from "../../../components/Seller/SellerNav";

import styles from "../../../styles/components/Seller/pages/ProductReviews.module.scss";
import { useAlert } from "../../_app";

const Review = () => {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const { setAlert } = useAlert();
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      (async () => {
        setLoading(true);
        try {
          const res = await axios.get<RespondType & { reviews?: ReviewType[] }>(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/products/getReviews`,
            {
              withCredentials: true,
            }
          );
          setLoading(false);
          if (res.data.status === "ok" && res.data.reviews) {
            setReviews(res.data.reviews);
          } else {
            setAlert({
              type: "message",
              message: res.data.message,
            });
          }
        } catch {
          setLoading(false);
          setAlert({
            type: "error",
            message: "failed to load reviews",
          });
        }
      })();
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <SellerNav>
      <h1>Products Review</h1>
      <div className={styles.reviews}>
        {loading && <h2>Loading...</h2>}
        {!loading && reviews.length === 0 && <h2>No reviews found</h2>}
        {reviews.length !== 0 &&
          !loading &&
          reviews.map((review, i) => (
            <ProductReviewsHolder review={review} key={i} />
          ))}
      </div>
    </SellerNav>
  );
};

export default Review;
