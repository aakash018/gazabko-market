import axios from "axios";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { AiFillDelete, AiFillHeart } from "react-icons/ai";
import { useAlert, useCart } from "../../../pages/_app";
import styles from "../../../styles/components/shared/Customer/CartItemHolder.module.scss";
import PriceHolder from "./PriceHolder";
import Quantity from "./Quantity";

import { Cart } from "../../../@types/global";
import Button from "../Button";
import Router from "next/router";

interface Props {
  name: string;
  quantity: number;
  showQuantity?: boolean;
  showCheck?: boolean;
  mp: number;
  discount: number;
  onChecked?: (e: ChangeEvent<HTMLInputElement>) => any;
  noDelete?: boolean;
  totalStock?: number;
  itemID?: string;
  check: boolean;
  id: number;
  onItemDelete: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  type?: "cart" | "wishlist";
}

const CartItemHolder: React.FC<Props> = ({
  onChecked,
  noDelete,
  check,
  itemID,
  name,
  totalStock,
  quantity,
  type = "cart",
  showCheck = true,
  mp,
  discount,
  id,
  showQuantity = true,
  onItemDelete,
  setLoading,
}) => {
  const [quantityInput, setQuantity] = useState(quantity);
  const { setAlert } = useAlert();
  const { setCart } = useCart();

  const handleDelete = async () => {
    if (type === "cart") {
      try {
        const res = await axios.post<RespondType>(
          `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/cart/deleteProduct`,
          {
            productID: id,
          },
          { withCredentials: true }
        );

        if (res.data.status === "ok") {
          setAlert({
            type: "message",
            message: res.data.message,
          });
          onItemDelete();
        } else {
          setAlert({
            type: "error",
            message: res.data.message,
          });
        }
      } catch {
        setAlert({
          type: "error",
          message: "failed to connect to servers",
        });
      }
    } else if (type === "wishlist") {
      try {
        const res = await axios.delete<RespondType>(
          `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/wishlist/deleteItem`,
          {
            params: {
              itemID,
            },
            withCredentials: true,
          }
        );

        if (res.data.status === "ok") {
          setAlert({
            type: "message",
            message: res.data.message,
          });
          onItemDelete();
        } else {
          setAlert({
            type: "error",
            message: res.data.message,
          });
        }
      } catch {
        setAlert({
          type: "error",
          message: "faield to connect to servers",
        });
      }
    }
  };

  const handleQuantityChange = async (e: number) => {
    setLoading(true);
    const res = await axios.post<RespondType & { cart?: Cart }>(
      `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/cart/updateQuantity`,
      {
        name,
        productID: id,
        quantity: e,
      },
      { withCredentials: true }
    );

    setLoading(false);
    if (res.data.status === "ok" && res.data.cart && setCart) {
      setCart(res.data.cart);
    } else {
      setAlert({
        type: "error",
        message: res.data.message,
      });
    }
  };

  console.log(discount);

  return (
    <div className={styles.cartItemHolder}>
      <>
        {" "}
        <section className={styles.imageContainer}>
          <Image src={"/images/shoes.jpg"} layout="fill" objectFit="cover" />
        </section>
        <section className={styles.info}>
          <section className={styles.name}>{name}</section>
          {showQuantity && totalStock && (
            <section className={styles.quantityContainer}>
              <Quantity
                quantityInput={quantityInput}
                setQuantity={setQuantity}
                totalStock={totalStock}
                onQuantityChange={handleQuantityChange}
              />
            </section>
          )}
          <section className={styles.price}>
            <PriceHolder discount={discount} mp={mp} />
          </section>
          <section className={styles.actionBtns}>
            {noDelete ? <></> : <AiFillDelete onClick={handleDelete} />}
            {type === "wishlist" && (
              <Button
                onClick={() => {
                  Router.push(`/products/${id}`);
                }}
              >
                View Product
              </Button>
            )}
          </section>
        </section>
        {showCheck && (
          <section className={styles.checkBox}>
            <input type="checkBox" onChange={onChecked} checked={check} />
          </section>
        )}
      </>
    </div>
  );
};

export default CartItemHolder;
