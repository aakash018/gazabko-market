import React, { useRef, useState } from "react";

import styles from "../../styles/components/Admin/AddCategoriesModal.module.scss";
import Button from "../shared/Button";
import IntputField from "../shared/Input";
import TagsSelector from "../shared/TagsSelector";

import Modal from "react-modal";
import { customStyles } from "../../modalStyle";
import axios from "axios";
import { useAlert } from "../../pages/_app";

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
  const [subsubCats, setSubSubCats] = useState<
    { item: string; subsubCats: string }[]
  >([]);

  const [addSubCatModel, setAddSubCatModal] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [subCatCommision, setSubCatCommision] = useState("");
  const [allSubCatCom, setAllSubCatCom] = useState<
    { item: string; commission: string }[]
  >([]);

  const subCatCommissionRef = useRef<HTMLInputElement>(null);

  const { setAlert } = useAlert();

  const handleSubmit = async () => {
    try {
      const res = await axios.post<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/category/add`,
        {
          categoryName: catNameInput,
          commision: catCommisionInput,
          subCategory: subCats,
          subsubCats: subsubCats,
          subCategoryCommision: allSubCatCom,
        },
        { withCredentials: true }
      );

      if (res.data.status === "ok") {
        setAlert({
          type: "message",
          message: res.data.message,
        });
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "failed to connect to server",
      });
    }
  };

  return (
    <div>
      <Modal
        isOpen={addSubCatModel}
        style={customStyles}
        onRequestClose={() => setAddSubCatModal(false)}
        onAfterOpen={() => {
          if (
            subCatCommissionRef.current &&
            allSubCatCom.filter((ele) => ele.item === selectedSubCategory)[0]
          ) {
            subCatCommissionRef.current.value =
              allSubCatCom.filter((ele) => ele.item === selectedSubCategory)[0]
                .commission || "0";
          }
        }}
      >
        <IntputField
          label="Add Sub Category Commision"
          type={"number"}
          setState={setSubCatCommision}
          input={subCatCommissionRef}
        />
        <TagsSelector
          label="Add Sub Sub catogery"
          listState={subsubCats.filter(
            (cat) => cat.item === selectedSubCategory
          )}
          setListState={setSubSubCats}
          // here item is name of subcat
          onSaveRequest={(input) => {
            setSubSubCats((prev) => {
              return [
                ...prev,
                { item: selectedSubCategory, subsubCats: input },
              ];
            });
          }}
        />
        <div style={{ marginTop: 10 }}>
          <Button
            onClick={() => {
              // below code is used to produce  [{item: , commission}, {item: , commission:}]
              //if subcat i.e item exists update it else make new obj
              if (
                allSubCatCom.some(
                  (subcat) => subcat.item === selectedSubCategory
                )
              ) {
                setAllSubCatCom((prev) =>
                  prev.map((subCat) => {
                    if (subCat.item === selectedSubCategory) {
                      subCat.commission = subCatCommision;
                      return subCat;
                    } else {
                      return subCat;
                    }
                  })
                );
              } else {
                setAllSubCatCom((prev) => [
                  ...prev,
                  { item: selectedSubCategory, commission: subCatCommision },
                ]);
              }
              setAddSubCatModal(false);
            }}
          >
            OK
          </Button>
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
          onTagsClick={(item) => {
            setSelectedSubCategory(item);
            setAddSubCatModal(true);
          }}
        />
        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </div>
  );
};

export default AddCategoriesModal;
