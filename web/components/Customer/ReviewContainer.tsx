import React from "react";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import styles from "../../styles/components/Customer/ReviewContainer.module.scss";

interface Props {
  name: string;
  rating: number;
  review: string;
}

const ReviewContainer: React.FC<Props> = ({ name, rating, review }) => {
  return (
    <div className={styles.reviewContainer}>
      <div>
        <section className={styles.rating}>
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStarHalf />
          <span>{rating}</span>
        </section>
        <section className={styles.name}>{name}</section>
      </div>

      <section className={styles.review}>{review}</section>
    </div>
  );
};

export default ReviewContainer;
