import React, { LegacyRef } from "react";
import styles from "../../styles/components/shared/Input.module.scss";

interface Props {
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  input: LegacyRef<HTMLInputElement>;
  id?: string;
  className?: string;
}

const IntputField: React.FC<Props> = ({
  placeholder,
  label,
  type = "text",
  input,
  id,
  className,
}) => {
  return (
    <div>
      <label htmlFor={id} style={{ display: "block" }}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        ref={input}
        className={`${styles.default} ${className ? styles[className] : ""}"`}
      />
    </div>
  );
};

export default IntputField;
