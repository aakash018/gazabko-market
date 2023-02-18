import axios from "axios";
import Router from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Cart } from "../@types/global";
import Layout from "../components/Customer/Layout";
import Button from "../components/shared/Button";
import CartItemHolder from "../components/shared/Customer/CartItemHolder";
import PrivatePage from "../components/shared/PrivatePage";

import styles from "../styles/components/Customer/pages/cartPage.module.scss";
import { useAlert, useCart } from "./_app";

const Cart: React.FC = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [subTotal, setSubTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const selectAllRef = useRef<HTMLInputElement>(null);

  const { cart, setCart } = useCart();
  const [checkList, setCheckList] = useState<boolean[]>([]);
  const { setAlert } = useAlert();

  const shippingFee = useRef<number>(60).current;

  const handleGetCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get<RespondType & { cart?: Cart }>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/cart/getCart`,
        { withCredentials: true }
      );
      if (res.data.status === "ok" && res.data.cart) {
        if (setCart) {
          setCart(res.data.cart);
          setLoading(false);
          //? To unselect every item at page render
          if (checkList.length === 0 && res.data.cart?.products) {
            setCheckList(res.data.cart!.products.map((_) => false));
          }
        }
      } else {
        setLoading(false);

        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setLoading(false);
      setAlert({
        type: "error",
        message: "failed to get cart info",
      });
    }
  };

  useEffect(() => {
    {
      cart?.products &&
        setTotalPrice(
          cart!.products.reduce((accumulator, product, i) => {
            if (checkList[i]) {
              if (
                product.product.offers?.common_discount &&
                product.product.offers.discount
              ) {
                return (
                  accumulator +
                  (product.product.price -
                    (product.product.price * product.product.offers.discount) /
                      100) *
                    product.quantity
                );
              } else {
                return (
                  accumulator +
                  (product.product.price - product.product.discount) *
                    product.quantity
                );
              }
            } else {
              return accumulator;
            }
          }, 0)
        );
    }
  }, [cart, checkList]);

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      handleGetCart();
    }
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (checkList.length !== 0) {
      if (checkList.some((element) => element === false)) {
        selectAllRef.current!.checked = false;
      }
      if (checkList.every((element) => element === true)) {
        selectAllRef.current!.checked = true;
      }
    }
  }, [checkList]);

  const onItemCheck = (eleIndex: number) => {
    //? CHECK AND UNCHECK BOXES STATE
    console.log(checkList);
    setCheckList((prev) =>
      prev.map((bool, i) => {
        if (eleIndex === i) {
          return !bool;
        } else {
          return bool;
        }
      })
    );
  };

  return (
    <PrivatePage>
      <Layout>
        {loading && (
          <h2
            style={{
              width: "100%",
              height: "400px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Loading...
          </h2>
        )}
        {!loading && cart?.products.length === 0 && (
          <h2
            style={{
              width: "100%",
              height: "400px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            No items added
          </h2>
        )}
        {!loading && cart?.products.length !== 0 && (
          <>
            <div className={styles.title}>Cart</div>
            <section className={styles.cartSelection}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <span className={styles.text}>Select All</span>
                <span>
                  <input
                    ref={selectAllRef}
                    type="checkbox"
                    name="selectAll"
                    onChange={() => {
                      setCheckList((prev) => prev.map((_) => true));
                    }}
                  />
                </span>
              </div>
              <span>
                <AiFillDelete
                  size={"2rem"}
                  style={{ color: "var(--default-red)" }}
                />
              </span>
            </section>
            <div className={styles.cartBody}>
              <div className={styles.cartItems}>
                {cart &&
                  cart.products.length !== 0 &&
                  cart.products
                    .sort()
                    .map((product, i) => (
                      <CartItemHolder
                        check={checkList[i]}
                        onChecked={() => onItemCheck(i)}
                        name={product.product.name}
                        discount={
                          product.product.offers?.common_discount &&
                          product.product.offers.discount
                            ? product.product.price *
                              (product.product.offers.discount / 100)
                            : product.product.discount
                        }
                        mp={product.product.price}
                        quantity={product.quantity}
                        key={i}
                        id={product.product.id}
                        onItemDelete={handleGetCart}
                        setLoading={setLoading}
                      />
                    ))}
              </div>
              <div className={styles.orderSummary}>
                <section className={styles.title}>Order Summary</section>
                <section className={styles.info}>
                  <section className={styles.data}>
                    <span className={styles.title}>SubTotal: </span>
                    <span className={styles.number}>Rs. {totalPrice} </span>
                  </section>
                  <section className={styles.data}>
                    <span className={styles.title}>Shipping fee: : </span>
                    <span className={styles.number}>Rs. {shippingFee} </span>
                  </section>
                  <section className={`${styles.data} ${styles.total}`}>
                    <span className={styles.title}>Total: </span>
                    <span className={styles.number}>
                      Rs. {totalPrice + 60}{" "}
                    </span>
                  </section>
                  <section className={styles.actionBtn}>
                    <Button
                      color="success"
                      onClick={() => {
                        const selectedProducts = cart!.products.filter(
                          (_, i) => {
                            if (checkList[i]) return true;
                          }
                        );
                        if (selectedProducts.length === 0) {
                          return setAlert({
                            type: "error",
                            message: "select at least one item !",
                          });
                        }
                        if (setCart) {
                          setCart({
                            subTotal: totalPrice,
                            totalProducts: selectedProducts.length,
                            products: selectedProducts,
                          });
                        }
                        Router.push("/checkout");
                      }}
                      disable={checkList.every((element) => element === false)}
                    >
                      PROCED TO CHECKOUT
                    </Button>
                  </section>
                </section>
              </div>
            </div>
          </>
        )}
      </Layout>
    </PrivatePage>
  );
};

export default Cart;
