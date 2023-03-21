import React, { useEffect, useRef, useState } from "react";

import styles from "../../../styles/components/Admin/pages/ProductReviews.module.scss";
import AdminLayout from "../../../components/Admin/AdminNav";
import ProductReviewsHolder from "../../../components/Admin/shared/ProductReviewsHolder";
import SearchBar from "../../../components/Admin/shared/SearchBar";
import axios from "axios";
import { ReviewType } from "../../../@types/rrr";
import { useAlert } from "../../_app";

const ProductReviews = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState(false);
  const { setAlert } = useAlert();

  const ignore = useRef(false);
  useEffect(() => {
    if (!ignore.current) {
      (async () => {
        try {
          setLoading(true);
          const res = await axios.get<RespondType & { reviews: ReviewType[] }>(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/products/getReviews`,
            {
              withCredentials: true,
            }
          );

          if (res.data.status === "ok") {
            setReviews(res.data.reviews);
            setLoading(false);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        } catch (e) {
          console.log(e);
          setLoading(false);
          setAlert({
            type: "error",
            message: "failed to connect to servers",
          });
        }
      })();
    }
    return () => {
      ignore.current = true;
    };
  });

  return (
    <AdminLayout>
      <h1>Product Reviews</h1>
      <div className={styles.productReviews}>
        <div className={styles.search}>
          <SearchBar inputRef={searchRef} />
        </div>
        <div className={styles.reviews}>
          {loading && <h2>Loading...</h2>}
          {!loading && reviews.length === 0 && <h2>No reviews</h2>}
          {!loading &&
            reviews.length !== 0 &&
            reviews.map((review, i) => (
              <ProductReviewsHolder review={review} key={i} />
            ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductReviews;
