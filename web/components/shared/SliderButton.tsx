import React, { useRef } from "react";
import styles from "../../styles/components/shared/SliderButton.module.scss";

interface Props {
  onClick?: () => void;
}

const SliderButton: React.FC<Props> = ({ onClick }) => {
  const buttonCircle = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    buttonCircle.current?.classList.toggle(styles.active);
    button.current?.classList.toggle(styles.activeBtn);

    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={styles.sliderBtn} onClick={handleClick} ref={button}>
      <div className={styles.innerCircle} ref={buttonCircle}></div>
    </div>
  );
};

export default SliderButton;
