import React, { useRef, useState } from "react";

import styles from "../../styles/components/shared/TagsSelector.module.scss";
import SelectedItemHolder from "../Admin/shared/SelectedItemHolder";
import IntputField from "./Input";

interface Props {
  listState: any[];
  setListState: React.Dispatch<React.SetStateAction<any[]>>;
  label: string;
  placeholder?: string;
  onTagsClick?: (item: string) => void;
  onSaveRequest?: (input: string) => void;
  onTagAdd?: () => void;
}

const TagsSelector: React.FC<Props> = ({
  listState,
  setListState,
  label,
  placeholder,
  onTagsClick,
  onSaveRequest,
  onTagAdd,
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

  const handelCancelSelect = (
    select: string,
    type: "list" | "obj" = "list"
  ) => {
    if (type === "list") {
      setListState((prev) => prev.filter((item) => item !== select));
    } else {
      setListState((prev) => prev.filter((item) => item.subsubCats !== select));
    }
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
            content={item.subsubCats || item}
            key={i}
            onTagClick={() => {
              if (onTagsClick) {
                onTagsClick(item);
              }
            }}
            onCancel={() => {
              if (item.subsubCats) {
                handelCancelSelect(item.subsubCats, "obj");
              } else {
                handelCancelSelect(item, "list");
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TagsSelector;
