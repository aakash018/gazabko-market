import React, { ReactNode } from "react";
import styles from "../../styles/components/shared/Button.module.scss";

interface Props {
  children: ReactNode;
  onClick: () => any;
  className?: string;
  color?: "error" | "success" | "default";
  type?: "submit" | "reset" | "button";
  look?: "outlined" | "filled" | "blank";
  icon?: ReactNode;
}

const Button: React.FC<Props> = ({
  children,
  className = "default",
  onClick,
  color = "default",
  type = "button",
  look = "filled",
  icon,
}) => {
  return (
    <>
      <button
        type={type}
        className={`${styles[className]} 
            ${styles[color]} 
            ${styles[type]} 
            ${styles[look]} 
            ${styles.common}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
