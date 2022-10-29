import Router from "next/router";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import OrderHistoryLayout from "../../components/Customer/OrderHistoryLayout";
import Button from "../../components/shared/Button";
import CartItemHolder from "../../components/shared/Customer/CartItemHolder";
import styles from "../../styles/components/Customer/pages/OrderHistoryPage.module.scss";
import cartStyles from "../../styles/components/Customer/pages/cartPage.module.scss";

const Wishlist: React.FC = () => {
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
    <OrderHistoryLayout>
      <div className={styles.title}>My Wishlist</div>
      <section className={cartStyles.cartSelection} style={{ width: "100%" }}>
        <span className={cartStyles.text}>Select All</span>
        <span>
          <input type="checkbox" name="selectAll" />
        </span>
      </section>
      <div className={cartStyles.cartBody} style={{ width: "100%" }}>
        <div className={cartStyles.cartItems} style={{ width: "100%" }}>
          <CartItemHolder noDelete={true} onChecked={onItemCheck} /> <CartItemHolder noDelete={true} onChecked={onItemCheck} />
          <CartItemHolder noDelete={true} onChecked={onItemCheck} />
        </div>
      </div>
    </OrderHistoryLayout>
  );
};

export default Wishlist;
