import React from "react";
import Layout from "../../components/Customer/Layout";
import OrderTracker from "../../components/shared/Customer/OrderTracker";
import styles from "../../styles/components/Customer/pages/PurchesTraker.module.scss";
import Image from "next/image";
import ShowCase from "../../components/Customer/ShowCase";

const PurchesTracker: React.FC = () => {
  return (
    <Layout sidebar="clickable">
      <div className={styles.purchesTracker}>
        <div className={styles.tracker}>
          <OrderTracker />
        </div>
        <div className={styles.detailsCards}>
          <div className={styles.leftPart}>
            <div className={styles.product}>
              <div className={styles.title}>Product</div>
              <div className={styles.content}>
                <div className={styles.productImg}>
                  <Image
                    src="/images/shoes.jpg"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className={styles.info}>
                  <div>Men Breathable Light Sports Shoes of Student</div>
                  <div>Rs. 2,400</div>
                  <div>Qty: 1</div>
                </div>
              </div>
            </div>
            <div className={styles.totalSummary}>
              <div className={styles.title}>Total Summary</div>
              <div className={styles.content}>
                <div className={styles.info}>
                  <div className={styles.name}>Subtotal</div>
                  <div className={styles.data}>Rs. 2,400</div>
                </div>
                <div className={styles.info}>
                  <div className={styles.name}>Shipping Fee</div>
                  <div className={styles.data}>Rs 60</div>
                </div>
                <div className={styles.info}>
                  <div className={styles.name}>Total</div>
                  <div className={styles.data}>Rs. 2,460</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.shippingDetails}>
            <div className={styles.title}>Shipping Details</div>
            <div className={styles.content}>
              <div className={styles.info}>
                <div className={styles.name}>Date Shipping</div>
                <div className={styles.data}>January 16, 2020</div>
              </div>
              <div className={styles.info}>
                <div className={styles.name}>Delivery Address</div>
                <div className={styles.data}>Pokhara ,14 Newroad</div>
              </div>
              <div className={styles.info}>
                <div className={styles.name}>Nearest Landmark</div>
                <div className={styles.data}>Araniko Hospital</div>
              </div>
            </div>
          </div>
        </div>
        <ShowCase
          showTitle={true}
          title="More Products For You"
          noOfProducts={10}
        />
      </div>
    </Layout>
  );
};

export default PurchesTracker;
