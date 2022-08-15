import Link from "next/link";
import React, { useRef } from "react";
import { BsCash } from "react-icons/bs";
import Layout from "../components/Customer/Layout";
import Button from "../components/shared/Button";
import Intput from "../components/shared/Input";
import styles from "../styles/components/Customer/pages/Checkout.module.scss";

const CheckoutPage = () => {
  const deliveryAddress = useRef<HTMLInputElement>(null);

  return (
    <Layout sidebar="show">
      <div className={styles.checkoutPage}>
        <div className={styles.titleMain}>Checkout</div>
        <div className={styles.content}>
          <div className={styles.logo}>
            <BsCash />
            <span>Cash On Delivery</span>
          </div>
          <div className={styles.info}>
            You can pay in cash to our courier when you receive the goods at
            your doorstep.
          </div>
          <div className={styles.itemsBeingBought}>
            <div className={styles.title}>Items in the cart</div>
            <ul>
              <li>
                <Link href={"/products/adadsd"}>Manaslu Mg5 Semi</Link>
              </li>
              <li>
                <Link href={"/products/adadsd"}>GoldStar Shoes P302 Black</Link>
              </li>
              <li>
                <Link href={"/products/adadsd"}>Yearcon Black Easy Shoes</Link>
              </li>
              <li>
                <Link href={"/products/adadsd"}>
                  OLEEV White Dial King/Queen...
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.paymentInfo}>
            <div className={styles.orderSummary}>
              <section className={styles.info}>
                <section className={styles.data}>
                  <span className={styles.title}>SubTotal: </span>
                  <span className={styles.number}>Rs. {2400} </span>
                </section>
                <section className={styles.data}>
                  <span className={styles.title}>Shipping fee: : </span>
                  <span className={styles.number}>Rs. {60} </span>
                </section>
                <section className={`${styles.data} ${styles.total}`}>
                  <span className={styles.title}>Total: </span>
                  <span className={styles.number}>Rs. {2460} </span>
                </section>
                <div className={styles.addressInfo}>
                  <Intput input={deliveryAddress} label="Delivery address" />
                  <Intput input={deliveryAddress} label="Nearest Landmark" />
                </div>
                <section className={styles.actionBtn}>
                  <Button>CONFIRM ORDER</Button>
                </section>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
