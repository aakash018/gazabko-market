import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { BsCash } from "react-icons/bs";
import Layout from "../components/Customer/Layout";
import Button from "../components/shared/Button";
import IntputField from "../components/shared/Input";

import styles from "../styles/components/Customer/pages/Checkout.module.scss";

const Map = dynamic(() => import("../components/shared/Map"), { ssr: false });

const CheckoutPage = () => {
  const deliveryAddress = useRef<HTMLInputElement>(null);

  const [newAddress, setNewAddress] = useState("");

  const [showMap, setShowMap] = useState(false);

  return (
    <Layout>
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
                    <Link href={"/products/adadsd"}>
                      GoldStar Shoes P302 Black
                    </Link>
                  </li>
                  <li>
                    <Link href={"/products/adadsd"}>
                      Yearcon Black Easy Shoes
                    </Link>
                  </li>
                  <li>
                    <Link href={"/products/adadsd"}>
                      OLEEV White Dial King/Queen...
                    </Link>
                  </li>
                </ul>
              </div>
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
                  <section className={styles.actionBtn}>
                    <Button>CONFIRM ORDER</Button>
                  </section>
                </section>
              </div>
            </div>
          </div>
          <div className={styles.addressHolder}>
            <h3>Default Delivery Address</h3>
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
                    Deva Arcade, Lut Chok, Thamel, 14292-Kathmandu, Bagmati
                    Pradesh, Nepal
                  </div>
                </div>
                <div className={styles.infoTab}>
                  <div className={styles.tag}>Nearest Landmark</div>
                  <div className={styles.info}>Deva Arcade</div>
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
    </Layout>
  );
};

export default CheckoutPage;
