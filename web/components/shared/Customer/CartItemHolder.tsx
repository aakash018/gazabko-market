import Image from "next/image";
import React, { ChangeEvent } from "react";
import { AiFillDelete, AiFillHeart } from "react-icons/ai";
import styles from "../../../styles/components/shared/Customer/CartItemHolder.module.scss";
import PriceHolder from "./PriceHolder";
import Quantity from "./Quantity";

interface Props {
  name?: string;
  quantity?: number;
  mp?: number;
  discount?: number;
  onChecked?: (e: ChangeEvent<HTMLInputElement>) => any;
  noDelete?: boolean;
}

const CartItemHolder: React.FC<Props> = ({ onChecked, noDelete }) => {
  return (
    <div className={styles.cartItemHolder}>
      <section className={styles.imageContainer}>
        <Image src={"/images/shoes.jpg"} layout="fill" objectFit="cover" />
      </section>
      <section className={styles.info}>
        <section className={styles.name}>
          Lotto 212125-5II Megalight Ultra III Shoe
        </section>
        <section className={styles.quantityContainer}>
          <Quantity quantity={2} totalStock={6} />
        </section>
        <section className={styles.price}>
          <PriceHolder discount={300} mp={2700} />
        </section>
        <section className={styles.actionBtns}>
          <AiFillHeart />
          { noDelete ? <></> : <AiFillDelete /> }
        </section>
      </section>
      <section className={styles.checkBox}>
        <input type="checkBox" onChange={onChecked} />
      </section>
    </div>
  );
};

export default CartItemHolder;
