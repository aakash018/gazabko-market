import React, { ReactNode } from "react";
import styles from "../../styles/components/shared/Button.module.scss";

interface Props {
  children: ReactNode;
  onClick?: () => any;
  className?: string;
  color?: "error" | "success" | "default" | "white";
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
    <div>
      <button
        type={type}
        className={`${className} 
        ${styles[color]} 
        ${styles[type]} 
        ${styles[look]} 
        ${styles.common}`}
        onClick={onClick}
      >
        {icon}
        {children}
      </button>
    </div>
  );
};

export default Button;
