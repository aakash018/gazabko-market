import React, { useState } from "react";

import Button from "../Button";

import styles from "../../../styles/components/shared/Customer/Quantity.module.scss";

interface Props {
  totalStock: number;
  onQuantityChange?: (quntity: number) => void;
  quantityInput: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const Quantity: React.FC<Props> = ({
  totalStock,
  onQuantityChange,
  quantityInput,
  setQuantity,
}) => {
  const handleQuantityChange = (e: number) => {
    if (onQuantityChange) {
      onQuantityChange(e);
    }
  };

  return (
    <section className={styles.quantity}>
      <span>Quantity</span>
      <div className={styles.buttons}>
        <Button
          onClick={() => {
            if (quantityInput !== 1) {
              setQuantity((prev) => prev - 1);
              handleQuantityChange(quantityInput - 1);
            }
          }}
          color="error"
        >
          -
        </Button>
        <span className={styles.count}>{quantityInput}</span>
        <Button
          onClick={() => {
            if (quantityInput !== totalStock) {
              setQuantity((prev) => prev + 1);
              handleQuantityChange(quantityInput + 1);
            }
          }}
          color="success"
        >
          +
        </Button>
      </div>
    </section>
  );
};

export default Quantity;
