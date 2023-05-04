import React from "react";
import styles from "../../styles/components/Customer/ReviewContainer.module.scss";
import { Rating } from "react-simple-star-rating";

interface Props {
  name: string;
  rating: number;
  review: string;
  created_at: string;
}

const ReviewContainer: React.FC<Props> = ({
  name,
  rating,
  review,
  created_at,
}) => {
  return (
    <div className={styles.reviewContainer}>
      <span>{created_at.split("T")[0]}</span>
      <div>
        <section className={styles.rating}>
          <Rating initialValue={rating} readonly size={15} />
        </section>
        <section className={styles.name}>{name}</section>
      </div>

      <section className={styles.review}>{review}</section>
    </div>
  );
};

export default ReviewContainer;
