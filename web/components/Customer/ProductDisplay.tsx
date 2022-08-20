import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";
import {
  BsBagPlusFill,
  BsCashStack,
  BsFillCartPlusFill,
  BsStarFill,
  BsStarHalf,
} from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { useAlert } from "../../pages/_app";
import styles from "../../styles/components/Customer/ProductInfoDisplay.module.scss";
import Button from "../shared/Button";
import PriceHolder from "../shared/Customer/PriceHolder";
import Quantity from "../shared/Customer/Quantity";

interface Props {
  name: string;
  rating: number;
  mp: number;
  discount: number;
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
  const [quantity, setQuantity] = useState(1);
  const { setAlert } = useAlert();

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
          <PriceHolder discount={discount} mp={mp} />
        </section>
        <Quantity quantity={1} totalStock={totalStock} />
        <div> {totalStock} items remaining in stock </div>
        <section className={styles.productDisplay__productInfo_actionBtns}>
          <Button
            onClick={() => {
              Router.push("/checkout");
            }}
            color="error"
          >
            <span>
              <BsBagPlusFill />
            </span>
            <span>Buy Now</span>
          </Button>
          <Button
            onClick={() => {
              setAlert({
                type: "message",
                message: "Added to cart",
              });
            }}
          >
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
            <span className={styles.sellerName}>
              <Link href={"/sellerInfo/sdfsfd"}>{sellerName}</Link>{" "}
            </span>
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
