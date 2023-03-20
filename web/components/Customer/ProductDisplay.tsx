import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";
import {
  BsBagPlusFill,
  BsCashStack,
  BsFillCartPlusFill,
  BsHeart,
  BsHeartFill,
  BsStarFill,
  BsStarHalf,
} from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";

import {
  HiOutlineInformationCircle,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { ProtuctType, Seller } from "../../@types/global";
import { useAuth } from "../../context/User";
import { useAlert, useCart } from "../../pages/_app";
import styles from "../../styles/components/Customer/ProductInfoDisplay.module.scss";
import Button from "../shared/Button";
import PriceHolder from "../shared/Customer/PriceHolder";
import Quantity from "../shared/Customer/Quantity";

interface Props {
  id: number;
  name: string;
  rating: number;
  mp: number;
  discount: number;
  seller: Seller;
  totalStock: number;
  brand: string;
  product: ProtuctType;
  sizes?: string;
  color?: string;
}

const ProductInfoDisplay: React.FC<Props> = ({
  id,
  name,
  rating,
  mp,
  discount,
  seller,
  totalStock,
  brand,
  product,
  sizes,
  color,
}) => {
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const { setAlert } = useAlert();
  console.log(discount);
  const [displayImageURL, setDisplayImageURL] = useState("/images/shoes.jpg");
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined
  );
  const [selectedColor, setSelectedColor] = useState("");
  const { setCart } = useCart();

  // TODO for subTotal also add offer
  const handleBuyNow = () => {
    if (setCart) {
      setCart({
        subTotal: (mp - discount) * quantity,
        totalProducts: 1,
        products: [
          {
            product: product,
            quantity,
            sizes: selectedSize,
            color: selectedColor,
          },
        ],
      });
      Router.push("/checkout");
    }
  };

  const handleAddToCart = async () => {
    const res = await axios.post<RespondType>(
      `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/cart/addToCart`,
      {
        productID: id,
        productName: name,
        price: mp - discount,
        quantity: quantity,
        sizes: selectedSize,
        color: selectedColor,
      },
      { withCredentials: true }
    );

    if (res.data.status === "ok") {
      setAlert({
        type: "message",
        message: "Added to cart",
      });
    } else {
      setAlert({
        type: "error",
        message: res.data.message,
      });
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const res = await axios.post<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/wishlist/add`,
        {
          pid: id,
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
        message: "faield to connect to servers",
      });
    }
  };

  return (
    <div className={styles.productDisplay}>
      <div className={styles.productDisplay__imagesDisplay}>
        <div className={styles.productDisplay__imagesDisplay_img}>
          <Image
            src={displayImageURL}
            layout="fill"
            priority={true}
            objectFit="cover"
          />
        </div>
        <div className={styles.productDisplay__imagesDisplay_selector}>
          <Image
            src={"/images/shoes.jpg"}
            width={50}
            height={50}
            onClick={() => {
              setDisplayImageURL("/images/shoes.jpg");
            }}
          />
          <Image
            src={"/images/shoes2.webp"}
            width={50}
            height={50}
            onClick={() => {
              setDisplayImageURL("/images/shoes2.webp");
            }}
          />
          <Image
            src={"/images/shoes3.jpg"}
            width={50}
            height={50}
            onClick={() => {
              setDisplayImageURL("/images/shoes3.jpg");
            }}
          />
          <Image
            src={"/images/shoes4.jpeg"}
            width={50}
            height={50}
            onClick={() => {
              setDisplayImageURL("/images/shoes4.jpeg");
            }}
          />
        </div>
      </div>
      <div
        className={styles.productDisplay__productInfo}
        style={{ width: "40%" }}
      >
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
          <section style={{ marginTop: "5px", fontSize: "1.3rem" }}>
            Brand:{" "}
            <Link href={`/brand/brand?name=${brand}`}>
              <span
                style={{
                  color: "var(--theme-color)",
                  cursor: "pointer",
                }}
              >
                {brand}
              </span>
            </Link>
          </section>
        </div>
        <section className={styles.productDisplay__productInfo_price}>
          <PriceHolder discount={discount} mp={mp} />
        </section>
        {sizes && (
          <section
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            {JSON.parse(sizes).constructor === Array &&
              JSON.parse(sizes).map((size: string, i: number) => (
                <div
                  key={i}
                  className={`${styles.size} ${
                    selectedSize === size ? styles.selectedSize : ""
                  } `}
                  onClick={() => {
                    setSelectedSize(size);
                  }}
                >
                  {size}
                </div>
              ))}
          </section>
        )}
        <section
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          {color &&
            JSON.parse(color).constructor === Array &&
            JSON.parse(color).map((col: string, i: number) => (
              <div
                key={i}
                className={`${styles.colorHolder}
              ${selectedColor === col ? styles.selectedColor : ""}
              `}
                onClick={() => {
                  setSelectedColor(col);
                }}
              >
                {col}
              </div>
            ))}
        </section>
        {totalStock > 0 && (
          <Quantity
            quantityInput={quantity}
            setQuantity={setQuantity}
            totalStock={totalStock}
          />
        )}
        <div> {totalStock} items remaining in stock </div>
        <section className={styles.productDisplay__productInfo_actionBtns}>
          {totalStock <= 0 && <h2>Product is Out of stock</h2>}
          {totalStock > 0 && (
            <>
              <Button onClick={handleBuyNow} color="error">
                <span>
                  <BsBagPlusFill />
                </span>
                <span>Buy Now</span>
              </Button>
              <Button onClick={handleAddToCart}>
                <span>
                  <BsFillCartPlusFill />
                </span>
                <span>Add Cart</span>
              </Button>{" "}
            </>
          )}
        </section>
        <Button color="success" look="outlined" onClick={handleAddToWishlist}>
          <span>
            <BsHeartFill style={{ color: "var(--default-red)" }} size="2rem" />{" "}
          </span>
          <span>Add to Wishlist</span>
        </Button>
        <section className={styles.productDisplay__productInfo_aditionalInfo}>
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
                <svg
                  fill="var(--box-bg)"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="30px"
                  height="40px"
                  viewBox="0 0 30 40"
                  overflow="visible"
                  xmlSpace="preserve"
                >
                  <polygon points="0,20 30,0 30,40" />
                </svg>
              </div>
            </div>
          </section>
        </section>
      </div>
      {seller && (
        <div className={styles.productDisplayRight}>
          <div className={styles.productDisplayRightContainer}>
            <div className={styles.containers}>
              <span className={styles.grey}>Delivery</span>
              <span className={styles.grey}>
                <HiOutlineInformationCircle />
              </span>
            </div>
            <div
              className={styles.containers}
              style={{ alignItems: "center", borderBottom: "1px solid #ddd" }}
            >
              <div style={{ display: "flex", gap: "5px" }}>
                <span style={{ marginTop: "5px", fontSize: "20px" }}>
                  <HiOutlineLocationMarker />
                </span>
                {!user && <span>Not logged in</span>}
                {user && <span>{user?.address[0].deliveryAddress}</span>}
              </div>
            </div>
            <div className={styles.containers} style={{ alignItems: "center" }}>
              <div style={{ display: "flex", gap: "5px" }}>
                <span style={{ marginTop: "5px", fontSize: "20px" }}>
                  <FaShippingFast />
                </span>
                <span>
                  Standard Delivery
                  <br />
                  <span style={{ fontSize: "13px", color: "#757575" }}>
                    2 days
                  </span>
                </span>
              </div>
              <span style={{ fontSize: "16px", fontWeight: "500" }}>
                Rs. 60
              </span>
            </div>
            <div
              className={styles.containers}
              style={{ alignItems: "center", borderBottom: "1px solid #ddd" }}
            >
              <div style={{ display: "flex", gap: "5px" }}>
                <span style={{ fontSize: "20px" }}>
                  <BsCashStack />
                </span>
                <span>Cash on delivery</span>
              </div>
            </div>
            <div
              style={{
                padding: "8px 5px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span className={styles.grey}>Store name</span>
                <br />
                <Link href="/sellerInfo/dasds">
                  <a style={{ fontSize: "18px" }}>{seller.storeName}</a>
                </Link>
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
                onClick={() => {
                  Router.push(`/sellerInfo/${seller.id}`);
                }}
              >
                <span>Visit Store</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInfoDisplay;
