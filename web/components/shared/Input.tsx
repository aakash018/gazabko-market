import React, { LegacyRef } from "react";
import styles from "../../styles/components/shared/Input.module.scss";

interface Props {
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  input?: LegacyRef<HTMLInputElement>;
  id?: string;
  className?: string;
  value?: string;
  setState?: React.Dispatch<React.SetStateAction<string | undefined>>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
}

const IntputField: React.FC<Props> = ({
  placeholder,
  label,
  type = "text",
  input,
  id,
  className,
  value,
  setState,
  onKeyDown,
}) => {
  const handleChaange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setState) {
      setState(e.target.value);
    }
  };

  return (
    <div className={styles.mainInput}>
      <label htmlFor={id} style={{ display: "block" }}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        ref={input}
        className={`${styles.default} ${className ? styles[className] : ""}"`}
        value={value}
        onChange={handleChaange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default IntputField;
