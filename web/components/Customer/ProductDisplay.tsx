import Image from "next/image";
import React, { useState } from "react";
import {
  BsBagPlusFill,
  BsCashStack,
  BsFillCartPlusFill,
  BsStarFill,
  BsStarHalf,
} from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import styles from "../../styles/components/Customer/ProductInfoDisplay.module.scss";
import Button from "../shared/Button";

interface Props {
  name: string;
  rating: number;
  mp: number;
  discount?: number;
  sellerName: string;
  totalStock: number;
}

const ProductInfoDisplay: React.FC<Props> = ({
  name,
  rating,
  mp,
  discount,
  sellerName,
  totalStock,
}) => {
  let price: number = 0;

  const [quantity, setQuantity] = useState(1);

  if (discount && discount !== 0) {
    price = mp - discount;
  }

  return (
    <div className={styles.productDisplay}>
      <div className={styles.productDisplay__imagesDisplay}>
        <div className={styles.productDisplay__imagesDisplay_img}>
          <Image
            src={"/images/shoes.jpg"}
            layout="fill"
            priority={true}
            objectFit="cover"
          />
        </div>
        <div className={styles.productDisplay__imagesDisplay_selector}></div>
      </div>
      <div className={styles.productDisplay__productInfo}>
        <div>
          <section className={styles.productDisplay__productInfo_name}>
            <h1>{name}</h1>
          </section>
          <section className={styles.productDisplay__productInfo_rating}>
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
            <BsStarHalf />
            <span>{rating}</span>
          </section>
        </div>
        <section className={styles.productDisplay__productInfo_price}>
          <div
            className={`${styles.original} ${
              discount && discount !== 0 ? styles.discounted : ""
            }`}
          >
            Rs. {mp}
          </div>
          {discount !== 0 && price !== 0 && (
            <span className={styles.discountprice}>Rs. {price}</span>
          )}
        </section>
        <section className={styles.productDisplay__productInfo_quantity}>
          <span>Quantity</span>
          <div className={styles.buttons}>
            <Button
              onClick={() => {
                if (quantity !== 1) {
                  setQuantity((prev) => prev - 1);
                }
              }}
              color="error"
            >
              -
            </Button>
            <span className={styles.count}>{quantity}</span>
            <Button
              onClick={() => {
                if (quantity !== totalStock) {
                  setQuantity((prev) => prev + 1);
                }
              }}
              color="success"
            >
              +
            </Button>
          </div>

          <Button onClick={() => {}} look="blank">
            <FaHeart size={30} />
          </Button>
        </section>
        <div> {totalStock} items remaining in stock </div>
        <section className={styles.productDisplay__productInfo_actionBtns}>
          <Button onClick={() => {}} color="error">
            <span>
              <BsBagPlusFill />
            </span>
            <span>Buy Now</span>
          </Button>
          <Button onClick={() => {}}>
            <span>
              <BsFillCartPlusFill />
            </span>
            <span>Add Cart</span>
          </Button>
        </section>
        <section className={styles.productDisplay__productInfo_aditionalInfo}>
          <section
            className={
              styles.productDisplay__productInfo_aditionalInfo_sellerInfo
            }
          >
            <span>Sold By:</span>
            <span>{sellerName}</span>
          </section>
          <section
            className={
              styles.productDisplay__productInfo_aditionalInfo_delivary
            }
          >
            <span className={styles.icon}>
              <BsCashStack size={25} />
            </span>
            <span>Cash on Delivery (3 days to deliver)</span>
          </section>
          <section className={styles.policy}>
            <span>Return Policy</span>
            <span>Warenty Policy</span>
          </section>
        </section>
      </div>
    </div>
  );
};

export default ProductInfoDisplay;
