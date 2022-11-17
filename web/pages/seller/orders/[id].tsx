import Router from "next/router";
import React from "react";
import SellerNav from "../../../components/Seller/SellerNav";
import Button from "../../../components/shared/Button";
import OrderTracker from "../../../components/shared/Customer/OrderTracker";
import IntputField from "../../../components/shared/Input";

import Image from "next/image";

import styles from "../../../styles/components/Seller/pages/OrdersDetails.module.scss";

const OrdersDetails = () => {
  return (
    <SellerNav>
      <h1>Order Details</h1>
      <h2>Order No. 4587351451598</h2>
      <div className={styles.orderDetails}>
        <div className={styles.tracker}>
          <OrderTracker />
        </div>
        <div className={styles.info}>
          <div className={styles.product}>
            <div className={styles.img}>
              <Image src={"/images/shoes2.webp"} width={250} height={250} />
            </div>
            <div className={styles.content}>
              <div className={styles.infoHolder}>
                <div className={styles.title}>Name</div>
                <div className={styles.data}>
                  Goldstar G10 Starlite 4 Black/Red Shoes For Men
                </div>
              </div>
              <div className={styles.infoHolder}>
                <div className={styles.title}>Original Price</div>
                <div className={styles.data}>Rs. 2200</div>
              </div>
              <div className={styles.infoHolder}>
                <div className={styles.title}>Discount</div>
                <div className={styles.data}>Rs. 0</div>
              </div>
              <div className={styles.infoHolder}>
                <div className={styles.title}>Shipping Charge</div>
                <div className={styles.data}>Rs. 65</div>
              </div>
              <div className={styles.infoHolder}>
                <div className={styles.title}>Total Charge For 1 Item</div>
                <div className={styles.data}>Rs. 2265</div>
              </div>
              <div className={styles.infoHolder}>
                <div className={styles.title}>Quantity</div>
                <div className={styles.data}>2</div>
              </div>
              <div className={styles.infoHolder}>
                <div className={styles.title}>Total Charge For All Items </div>
                <div className={styles.data}>Rs. 4465</div>
              </div>
              <div className={styles.infoHolder}>
                <div className={styles.title}>Vendor</div>
                <div className={styles.data}>XYZ SuperMaart</div>
              </div>
              <div className={styles.infoHolder}>
                <div className={styles.title}>Gift Coupen Used</div>
                <div className={styles.data}>N/A</div>
              </div>
              <div className={styles.actBtn}>
                <Button>View Product</Button>
              </div>
            </div>
          </div>
          <div className={styles.customer}>
            <div
              style={{
                display: "flex",
                alignContent: "flex-start",
                gap: "100px",
              }}
            >
              <div className={styles.details}>
                <div className={styles.mainTitle}>Customer</div>
                <div className={styles.infoHolder}>
                  <div className={styles.title}>Last Name</div>
                  <div className={styles.data}>McMills</div>
                </div>
              </div>
              <div className={styles.details}>
                <div className={styles.mainTitle}>Delivery Details</div>

                <div className={styles.infoHolder}>
                  <div className={styles.title}>Address</div>
                  <div className={styles.data}>
                    <div>Araniko Hospital</div>
                    <div>New Road- 10, Pokhara</div>
                  </div>
                </div>
                <div className={styles.infoHolder}>
                  <div className={styles.title}>Order Placed At</div>
                  <div className={styles.data}>22 Jul 2022</div>
                </div>
                <div className={styles.infoHolder}>
                  <div className={styles.title}>Expected Delivary Date</div>
                  <div className={styles.data}>28 Jul 2022</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.statusControl}>
            <div className={styles.mainTitle}>Order Status Control</div>
            <div className={styles.actBtn}>
              <Button>Verify Order</Button>
              <Button color="error">Cancle Order</Button>
            </div>
          </div>
        </div>
      </div>
    </SellerNav>
  );
};

export default OrdersDetails;
