import axios from "axios";
import dynamic from "next/dynamic";
import Link from "next/link";
import Router from "next/router";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { BsCash } from "react-icons/bs";
import { Cart } from "../@types/global";
import Layout from "../components/Customer/Layout";
import Button from "../components/shared/Button";
import IntputField from "../components/shared/Input";
import PrivatePage from "../components/shared/PrivatePage";

import styles from "../styles/components/Customer/pages/Checkout.module.scss";

import { useAlert, useCart } from "./_app";

const Map = dynamic(() => import("../components/shared/Map"), { ssr: false });

type DeliveryAddressPage = {
  pageNo: 1 | 2 | 3;
  deliveryAddress: string;
  NearestLandMark: string;
};

const deliveryAddressPageData: DeliveryAddressPage[] = [
  {
    pageNo: 1,
    deliveryAddress:
      "Deva Arcade, Lut Chok, Thamel, 14292-Kathmandu, Bagmati Pradesh, Nepal",
    NearestLandMark: "Deva Arcade",
  },
  {
    pageNo: 2,
    deliveryAddress:
      "Nepal Academy School, 44618-Nagarjun, Bagmati Pradesh, Nepal",
    NearestLandMark: "Nepal Academy School",
  },
  {
    pageNo: 3,
    deliveryAddress: "Pnachkanya, 44618-Nagarjun, Bagmati Pradesh, Nepal",
    NearestLandMark: "Standard Co. Ed Highschool",
  },
];

const CheckoutPage = () => {
  const { cart, setCart } = useCart();
  const { setAlert } = useAlert();

  const [newAddress, setNewAddress] = useState("");

  const [showMap, setShowMap] = useState(false);

  const [giftWrapTotal, setGiftWrapTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [subTotalPrice, setSubTotalPrice] = useState(0);

  const [selectedAddress, setSelectedAddress] = useState<DeliveryAddressPage>(
    deliveryAddressPageData[0]
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!cart) {
        setLoading(true);
        const res = await axios.get<RespondType & { cart?: Cart }>(
          `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/cart/getCart`,
          {
            withCredentials: true,
          }
        );
        if (res.data.status === "ok" && res.data.cart && setCart) {
          setCart(res.data.cart);
          setLoading(false);
        } else {
          setAlert({
            type: "error",
            message: "no cart found",
          });
        }
      }
    })();
  }, []);

  const handleIsGiftCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.checked) {
      setGiftWrapTotal((prev) => prev + 25);
      setTotalPrice((prev) => prev + 25);

      const newProduct = cart?.products.map((product, i) => {
        if (i === index) {
          product.isGift = true;
        }
        return product;
      });
      if (newProduct && setCart) {
        setCart({
          products: newProduct,
          subTotal: totalPrice + giftWrapTotal,
          totalProducts: cart?.products.length as number,
        });
      }
    } else {
      setGiftWrapTotal((prev) => prev - 25);
      setTotalPrice((prev) => prev - 25);

      const newProduct = cart?.products.map((product, i) => {
        if (i === index) {
          product.isGift = false;
        }
        return product;
      });
      if (newProduct && setCart) {
        setCart({
          products: newProduct,
          subTotal: 0,
          totalProducts: cart?.products.length as number,
        });
      }
    }
  };

  useEffect(() => {
    if (cart?.products) {
      setSubTotalPrice(
        cart!.products.reduce((accumulator, product) => {
          return (
            accumulator +
            (product.product.price - product.product.discount) *
              product.quantity
          );
        }, 0)
      );
      setTotalPrice(
        cart!.products.reduce((accumulator, product) => {
          return (
            accumulator +
            (product.product.price - product.product.discount) *
              product.quantity +
            giftWrapTotal
          );
        }, 0)
      );
    }
  }, [cart?.products]);

  const handleChangeDeliveryAddress = (page: 1 | 2 | 3) => {
    setSelectedAddress(deliveryAddressPageData[page - 1]);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/order/addOrder`,
        {
          products: cart?.products,
        },
        { withCredentials: true }
      );

      if (res.data.status === "ok") {
        setAlert({
          type: "message",
          message: res.data.message,
        });
        Router.push("/");
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "failed to place order",
      });
    }
  };

  return (
    <PrivatePage>
      <Layout>
        {loading && <h2>Loading...</h2>}
        {cart && !loading && (
          <div className={styles.checkoutPage}>
            <div className={styles.titleMain}>Checkout</div>
            <div className={styles.content}>
              <div className={styles.upperPart}>
                <div className={styles.orderInfo}>
                  <div className={styles.logo}>
                    <BsCash />
                    <span>Cash On Delivery</span>
                  </div>
                  <div className={styles.info}>
                    You can pay in cash to our courier when you receive the
                    goods at your doorstep.
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div className={styles.itemsBeingBought}>
                      <div className={styles.title}>
                        <div>Items in the cart</div>
                        <div>Is this a gift?</div>
                      </div>
                      {cart?.products && (
                        <ul>
                          {cart?.products.map((product, i) => (
                            <li key={i}>
                              <Link href={`/products/${product.product.id}`}>
                                {product.product.name}
                              </Link>
                              <input
                                type={"checkbox"}
                                onChange={(e) => handleIsGiftCheck(e, i)}
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.paymentInfo}>
                  <div className={styles.orderSummary}>
                    <section className={styles.info}>
                      <section className={styles.data}>
                        <span className={styles.title}>SubTotal: </span>
                        <span className={styles.number}>
                          Rs. {subTotalPrice}{" "}
                        </span>
                      </section>
                      <section className={styles.data}>
                        <span className={styles.title}>Shipping fee: : </span>
                        <span className={styles.number}>Rs. {60} </span>
                      </section>
                      {giftWrapTotal !== 0 && (
                        <section className={`${styles.data}`}>
                          <span className={styles.title}>
                            Gift Wrap Charge:{" "}
                          </span>
                          <span className={styles.number}>
                            Rs. {giftWrapTotal}{" "}
                          </span>
                        </section>
                      )}
                      <section className={`${styles.data} ${styles.total}`}>
                        <span className={styles.title}>Total: </span>
                        <span className={styles.number}>
                          Rs. {totalPrice + 60}{" "}
                        </span>
                      </section>
                      <section className={styles.actionBtn}>
                        <Button onClick={handleSubmit}>CONFIRM ORDER</Button>
                      </section>
                    </section>
                  </div>
                </div>
              </div>
              <div className={styles.addressHolder}>
                <div className={styles.header}>
                  <h3>Default Delivery Address</h3>
                  <div className={styles.setAddresses}>
                    <div
                      className={`${styles.page} ${
                        selectedAddress.pageNo === 1 ? styles.selected : ""
                      }`}
                      onClick={() => handleChangeDeliveryAddress(1)}
                    >
                      1
                    </div>
                    <div
                      className={`${styles.page} ${
                        selectedAddress.pageNo === 2 ? styles.selected : ""
                      }`}
                      onClick={() => handleChangeDeliveryAddress(2)}
                    >
                      2
                    </div>
                    <div
                      className={`${styles.page} ${
                        selectedAddress.pageNo === 3 ? styles.selected : ""
                      }`}
                      onClick={() => handleChangeDeliveryAddress(3)}
                    >
                      3
                    </div>
                  </div>
                </div>
                <div className={styles.addressInfo}>
                  <section>
                    <div className={styles.infoTab}>
                      <div className={styles.tag}>Phone No.</div>
                      <div className={styles.info}>9862458712</div>
                    </div>
                    <div className={styles.infoTab}>
                      <div className={styles.tag}>Email</div>
                      <div className={styles.info}>randomxyz@gmail.com</div>
                    </div>
                  </section>
                  <section>
                    <div className={styles.infoTab}>
                      <div className={styles.tag}>Address</div>
                      <div className={styles.info}>
                        {selectedAddress.deliveryAddress}
                      </div>
                    </div>
                    <div className={styles.infoTab}>
                      <div className={styles.tag}>Nearest Landmark</div>
                      <div className={styles.info}>
                        {selectedAddress.NearestLandMark}
                      </div>
                    </div>
                  </section>
                </div>
                <div className={styles.newAddress}>
                  <a href="#map">
                    <Button
                      onClick={() => {
                        setShowMap(true);
                      }}
                    >
                      Set New Address
                    </Button>
                  </a>
                </div>
              </div>
              {showMap && (
                <div className={styles.map} id="map">
                  <div className={styles.mapHolder}>
                    <Map setAddress={setNewAddress} />
                  </div>
                  <div className={styles.addressInput}>
                    <IntputField label="Delivery Address" value={newAddress} />
                    <IntputField label="Nearest Landmark" />
                  </div>
                  <div className={styles.actBtn}>
                    <Button>Save</Button>
                    <Button
                      color="error"
                      onClick={() => {
                        setShowMap(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Layout>
    </PrivatePage>
  );
};

export default CheckoutPage;
