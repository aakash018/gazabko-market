import React, { useRef, useState } from "react";

import styles from "../../styles/components/Admin/AddCategoriesModal.module.scss";
import Button from "../shared/Button";
import IntputField from "../shared/Input";
import TagsSelector from "../shared/TagsSelector";

import Modal from "react-modal";
import { customStyles } from "../../modalStyle";

interface Props {
  catName?: string;
  subCategory?: string[];
  catCommision?: string;
}

const AddCategoriesModal: React.FC<Props> = ({
  catCommision = "0",
  catName = "",
  subCategory = [],
}) => {
  const [catNameInput, setCatName] = useState(catName);
  const [catCommisionInput, setCatCommision] = useState(catCommision);

  const [subCats, setSubCats] = useState<string[]>(subCategory);
  const [subsubCats, setSubSubCats] = useState<string[]>([]);

  const [addSubCatModel, setAddSubCatModal] = useState(false);

  return (
    <div>
      <Modal
        isOpen={addSubCatModel}
        style={customStyles}
        onRequestClose={() => setAddSubCatModal(false)}
      >
        <IntputField label="Add Sub Category Commision" type={"number"} />
        <TagsSelector
          label="Add Sub Sub catogery"
          listState={subsubCats}
          setListState={setSubSubCats}
        />
        <div style={{ marginTop: 10 }}>
          <Button>Save</Button>
        </div>
      </Modal>
      <div className={styles.addCategoriesModal}>
        <IntputField
          setState={setCatName}
          label="Category's Name"
          value={catNameInput}
        />
        <IntputField
          label="Add Category Commision"
          type={"number"}
          setState={setCatCommision}
          value={catCommisionInput}
        />
        <IntputField label="Banner" type={"file"} />
        <TagsSelector
          label="Sub-Catogries"
          listState={subCats}
          setListState={setSubCats}
          onTagsClick={() => setAddSubCatModal(true)}
        />
        <Button>Save</Button>
      </div>
    </div>
  );
};

export default AddCategoriesModal;
