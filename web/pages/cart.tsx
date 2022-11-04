import Router from "next/router";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import Layout from "../components/Customer/Layout";
import Button from "../components/shared/Button";
import CartItemHolder from "../components/shared/Customer/CartItemHolder";

import styles from "../styles/components/Customer/pages/cartPage.module.scss";

const Cart: React.FC = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [subTotal, setSubTotalPrice] = useState(0);

  const [checkList, setCheckList] = useState<boolean[]>([false, false, false]);
  const selectAllRef = useRef<HTMLInputElement>(null);

  const shippingFee = useRef<number>(60).current;

  useEffect(() => {
    if (shippingFee) {
      setTotalPrice(subTotal + shippingFee);
    }
  }, [subTotal]);

  useEffect(() => {
    if (checkList.some((element) => element === false)) {
      selectAllRef.current!.checked = false;
    }
    if (checkList.every((element) => element === true)) {
      selectAllRef.current!.checked = true;
    }

    setSubTotalPrice(checkList.filter((value) => value === true).length * 2400);
  }, [checkList]);

  const onItemCheck = (eleIndex: number) => {
    //? CHECK AND UNCHECK BOXES STATE
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
    <Layout>
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
          <AiFillDelete size={"2rem"} style={{ color: "var(--default-red)" }} />
        </span>
      </section>
      <div className={styles.cartBody}>
        <div className={styles.cartItems}>
          {checkList.map((check, i) => (
            <CartItemHolder
              check={check}
              onChecked={() => onItemCheck(i)}
              key={i}
            />
          ))}
        </div>
        <div className={styles.orderSummary}>
          <section className={styles.title}>Order Summary</section>
          <section className={styles.info}>
            <section className={styles.data}>
              <span className={styles.title}>SubTotal: </span>
              <span className={styles.number}>Rs. {subTotal} </span>
            </section>
            <section className={styles.data}>
              <span className={styles.title}>Shipping fee: : </span>
              <span className={styles.number}>Rs. {shippingFee} </span>
            </section>
            <section className={`${styles.data} ${styles.total}`}>
              <span className={styles.title}>Total: </span>
              <span className={styles.number}>Rs. {totalPrice} </span>
            </section>
            <section className={styles.actionBtn}>
              <Button
                color="success"
                onClick={() => {
                  Router.push("/checkout");
                }}
              >
                PROCED TO CHECKOUT
              </Button>
            </section>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
