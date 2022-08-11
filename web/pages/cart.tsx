import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Layout from "../components/Customer/Layout";
import Button from "../components/shared/Button";
import CartItemHolder from "../components/shared/Customer/CartItemHolder";

import styles from "../styles/components/Customer/pages/cartPage.module.scss";

const Cart: React.FC = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [subTotal, setSubTotalPrice] = useState(0);

  const shippingFee = useRef<number>(60).current;

  useEffect(() => {
    if (shippingFee) {
      setTotalPrice(subTotal + shippingFee);
    }
  }, [subTotal]);

  const onItemCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSubTotalPrice((prev) => prev + 2400);
    } else {
      setSubTotalPrice((prev) => prev - 2400);
    }
  };

  return (
    <Layout sidebar="show">
      <div className={styles.title}>Cart</div>
      <section className={styles.cartSelection}>
        <span className={styles.text}>Select All</span>
        <span>
          <input type="checkbox" name="selectAll" />
        </span>
      </section>
      <div className={styles.cartBody}>
        <div className={styles.cartItems}>
          <CartItemHolder onChecked={onItemCheck} />
          <CartItemHolder onChecked={onItemCheck} />
          <CartItemHolder onChecked={onItemCheck} />
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
              <Button color="success">PROCED TO CHECKOUT</Button>
            </section>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
