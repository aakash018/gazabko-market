import Router from "next/router";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import OrderHistoryLayout from "../../components/Customer/OrderHistoryLayout";
import Button from "../../components/shared/Button";
import CartItemHolder from "../../components/shared/Customer/CartItemHolder";
import styles from "../../styles/components/Customer/pages/OrderHistoryPage.module.scss";
import cartStyles from "../../styles/components/Customer/pages/cartPage.module.scss";
import { AiFillDelete } from "react-icons/ai";

const Wishlist: React.FC = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [subTotal, setSubTotalPrice] = useState(0);

  const [checkList, setCheckList] = useState<boolean[]>([false, false, false]);

  const selectAllRef = useRef<HTMLInputElement>(null);

  const shippingFee = useRef<number>(60).current;

  useEffect(() => {
    if (checkList.some((element) => element === false)) {
      selectAllRef.current!.checked = false;
    }
    if (checkList.every((element) => element === true)) {
      selectAllRef.current!.checked = true;
    }
  }, [checkList]);

  const onItemCheck = (eleIndex: number) => {
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
    <OrderHistoryLayout>
      <div className={styles.title}>My Wishlist</div>
      <section className={cartStyles.cartSelection} style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <span className={cartStyles.text}>Select All</span>
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
      <div className={cartStyles.cartBody} style={{ width: "100%" }}>
        <div className={cartStyles.cartItems} style={{ width: "100%" }}>
          {checkList.map((check, i) => (
            <CartItemHolder
              check={check}
              onChecked={() => onItemCheck(i)}
              key={i}
            />
          ))}
        </div>
      </div>
    </OrderHistoryLayout>
  );
};

export default Wishlist;
