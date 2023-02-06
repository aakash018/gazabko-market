import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/components/shared/SliderButton.module.scss";

interface Props {
  onClick?: () => void;
  originState: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const SliderButton: React.FC<Props> = ({ onClick, originState, setState }) => {
  const handleClick = () => {
    setState((prev) => !prev);

    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`${styles.sliderBtn} ${originState ? styles.activeBtn : ""}`}
      onClick={handleClick}
    >
      <div
        className={`${styles.innerCircle} ${originState ? styles.active : ""} `}
      ></div>
    </div>
  );
};

export default SliderButton;
