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
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
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
  onChange,
  onBlur,
}) => {
  const handleChaange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setState) {
      setState(e.target.value);
    }
    if (onChange) onChange(e);
  };

  return (
    <div className={styles.mainInput} style={{ width: "100%" }}>
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
        onBlur={onBlur}
      />
    </div>
  );
};

export default IntputField;
