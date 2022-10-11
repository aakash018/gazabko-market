import React, { useRef } from "react";

import styles from "../../styles/components/shared/TagsSelector.module.scss";
import SelectedItemHolder from "../Admin/shared/SelectedItemHolder";
import IntputField from "./Input";

interface Props {
  listState: string[];
  setListState: React.Dispatch<React.SetStateAction<string[]>>;
  label: string;
  placeholder?: string;
  onTagsClick?: () => void;
}

const TagsSelector: React.FC<Props> = ({
  listState,
  setListState,
  label,
  placeholder,
  onTagsClick,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handelSelect = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      if (inputRef.current) {
        if (listState.includes(inputRef.current?.value)) return;
        setListState((prev) => [...prev, inputRef.current!.value]);
      }
    }
  };

  const handelCancelSelect = (select: string) => {
    setListState((prev) => prev.filter((item) => item !== select));
  };

  return (
    <div className={styles.tagsSelector}>
      <div className={styles.input}>
        <IntputField
          input={inputRef}
          label={label}
          placeholder={placeholder}
          onKeyDown={handelSelect}
        />
      </div>
      <div className={styles.selectedItem}>
        {listState.map((item, i) => (
          <SelectedItemHolder
            content={item}
            key={i}
            onTagClick={onTagsClick}
            onCancel={() => {
              handelCancelSelect(item);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TagsSelector;
