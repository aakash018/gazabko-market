import React, { useRef, useState } from "react";

import styles from "../../styles/components/shared/TagsSelector.module.scss";
import SelectedItemHolder from "../Admin/shared/SelectedItemHolder";
import IntputField from "./Input";

interface Props {
  listState: string[];
  setListState: React.Dispatch<React.SetStateAction<string[]>>;
  label: string;
  placeholder?: string;
  onTagsClick?: () => void;
  onSaveRequest?: (input: string) => void;
}

const TagsSelector: React.FC<Props> = ({
  listState,
  setListState,
  label,
  placeholder,
  onTagsClick,
  onSaveRequest,
}) => {
  const [inputData, setInputData] = useState("");

  const handelSelect = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      if (inputData.trim() !== "") {
        if (onSaveRequest) {
          onSaveRequest(inputData);
        } else {
          if (listState.includes(inputData)) return;
          setListState((prev) => [...prev, inputData]);
        }
        setInputData("");
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
          setState={setInputData}
          label={label}
          placeholder={placeholder}
          onKeyDown={handelSelect}
          value={inputData}
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
