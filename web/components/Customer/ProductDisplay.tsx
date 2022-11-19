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
import { FaShippingFast } from "react-icons/fa";
import { GoTriangleLeft } from "react-icons/go";
import { HiOutlineInformationCircle, HiOutlineLocationMarker } from "react-icons/hi";
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
      <div className={styles.productDisplay__productInfo} style={{ width: "40%" }}>
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
          <section style={{ marginTop: "5px", fontSize: "14px" }}>
            Brand: <Link href="/brand/goldstar">Goldstar</Link>
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
          {/*<section
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
          </section>*/}
          <section className={styles.policy}>
            <span>Return Policy</span>
            <span>Warenty Policy</span>
          </section>
          <section className={styles.promocode}>
            <div className={styles.promocodeTitle}>Promocodes</div>
            <div className={styles.promocodeDescContainer}>
              <div className={styles.promocodeDesc}>
                <span>Spend Rs.2000 to collect Rs.250 cashback</span>
              </div>
              <div className={styles.leftTriangleContainer}>
                <svg fill="var(--box-bg)" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="30px" height="40px" viewBox="0 0 30 40" overflow="visible" xmlSpace="preserve">
                  <polygon points="0,20 30,0 30,40"/>
                </svg>
              </div>
            </div>
          </section>
        </section>
      </div>
      <div className={styles.productDisplayRight}>
        <div className={styles.productDisplayRightContainer}>
          <div className={styles.containers}>
            <span className={styles.grey}>Delivery</span>
            <span className={styles.grey}><HiOutlineInformationCircle /></span>
          </div>
          <div className={styles.containers} style={{ alignItems: "center", borderBottom: "1px solid #ddd" }}>
            <div style={{ display: "flex", gap: "5px" }}>
              <span style={{ marginTop: "5px", fontSize: "20px" }}><HiOutlineLocationMarker /></span>
              <span>Gandaki,Pokhara-Lekhnath Metro ,9 Newroad</span>
            </div>
            <Link href="#"><a style={{ color: "var(--theme-color)" }}>Change</a></Link>
          </div>
          <div className={styles.containers} style={{ alignItems: "center" }}>
            <div style={{ display: "flex", gap: "5px" }}>
              <span style={{ marginTop: "5px", fontSize: "20px" }}><FaShippingFast /></span>
              <span>Standard Delivery<br /><span style={{ fontSize: "13px", color: "#757575" }}>2 days</span></span>
            </div>
            <span style={{ fontSize: "16px", fontWeight: "500" }}>Rs. 65</span>
          </div>
          <div className={styles.containers} style={{ alignItems: "center", borderBottom: "1px solid #ddd" }}>
            <div style={{ display: "flex", gap: "5px" }}>
              <span style={{ fontSize: "20px" }}><BsCashStack /></span>
              <span>Cash on delivery</span>
            </div>
          </div>
          <div style={{ padding: "8px 5px", display: "flex", justifyContent: "space-between" }}>
            <div>
              <span className={styles.grey}>Store name</span><br/>
              <Link href="/sellerinfo/dasds"><a style={{ fontSize: "18px" }}>Bindabasini Shoe Store</a></Link>
            </div>
          </div>
          <div className={styles.ratings}>
            <div className={styles.rating}>
              <span>Seller rating</span>
              <span className={styles.ratingPercentage}>99%</span>
            </div>
            <div className={`${styles.rating} ${styles.ratingBorderLeft}`}>
              <span>Ship on time</span>
              <span className={styles.ratingPercentage}>99%</span>
            </div>
          </div>
          <div className={styles.productDisplayRightButton}>
            <Button
              color="error"
            >
              <span>Visit Store</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoDisplay;
