import React, { useRef, useState } from "react";

import styles from "../../styles/components/Admin/AddCategoriesModal.module.scss";
import Button from "../shared/Button";
import IntputField from "../shared/Input";
import TagsSelector from "../shared/TagsSelector";

import Modal from "react-modal";
import { customStyles } from "../../modalStyle";

const AddCategoriesModal: React.FC = () => {
  const catName = useRef<HTMLInputElement>(null);

  const [subCats, setSubCats] = useState<string[]>([]);
  const [subsubCats, setSubSubCats] = useState<string[]>([]);

  const [addSubCatModel, setAddSubCatModal] = useState(false);

  return (
    <div>
      <Modal
        isOpen={addSubCatModel}
        style={customStyles}
        onRequestClose={() => setAddSubCatModal(false)}
      >
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
        <IntputField input={catName} label="Category's Name" />
        <IntputField input={catName} label="Banner" type={"file"} />
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
