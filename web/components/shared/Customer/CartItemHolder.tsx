import axios from "axios";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { AiFillDelete, AiFillHeart } from "react-icons/ai";
import { useAlert } from "../../../pages/_app";
import styles from "../../../styles/components/shared/Customer/CartItemHolder.module.scss";
import PriceHolder from "./PriceHolder";
import Quantity from "./Quantity";

interface Props {
  name: string;
  quantity: number;
  mp: number;
  discount: number;
  onChecked?: (e: ChangeEvent<HTMLInputElement>) => any;
  noDelete?: boolean;
  check: boolean;
  id: number;
  onItemDelete: () => void;
}

const CartItemHolder: React.FC<Props> = ({
  onChecked,
  noDelete,
  check,
  name,
  quantity,
  mp,
  discount,
  id,
  onItemDelete,
}) => {
  const [quantityInput, setQuantity] = useState(quantity);
  const { setAlert } = useAlert();

  const handleDelete = async () => {
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
    } else {
      setAlert({
        type: "error",
        message: res.data.message,
      });
    }
    onItemDelete();
  };

  return (
    <div className={styles.cartItemHolder}>
      <section className={styles.imageContainer}>
        <Image src={"/images/shoes.jpg"} layout="fill" objectFit="cover" />
      </section>
      <section className={styles.info}>
        <section className={styles.name}>{name}</section>
        <section className={styles.quantityContainer}>
          <Quantity
            quantityInput={quantityInput}
            setQuantity={setQuantity}
            totalStock={6}
          />
        </section>
        <section className={styles.price}>
          <PriceHolder discount={discount} mp={mp} />
        </section>
        <section className={styles.actionBtns}>
          <AiFillHeart />
          {noDelete ? <></> : <AiFillDelete onClick={handleDelete} />}
        </section>
      </section>
      <section className={styles.checkBox}>
        <input type="checkBox" onChange={onChecked} checked={check} />
      </section>
    </div>
  );
};

export default CartItemHolder;
