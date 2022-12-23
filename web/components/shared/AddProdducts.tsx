import React, { useRef, useState } from "react";

import { TbArrowBack } from "react-icons/tb";

import styles from "../../styles/components/shared/AddProducts.module.scss";
import Button from "./Button";
import IntputField from "./Input";
import TagsSelector from "./TagsSelector";

//? Disableing SSR for Quill so that it can mess  with document and window object
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import { useRouter } from "next/router";

import Modal from "react-modal";
import { customStyles } from "../../modalStyle";
import SelectedItemHolder from "../Admin/shared/SelectedItemHolder";

interface Props {
  productName: React.RefObject<HTMLInputElement>;
  price: React.RefObject<HTMLInputElement>;
  discount: React.RefObject<HTMLInputElement>;
  totalStock: React.RefObject<HTMLInputElement>;
  offer: React.RefObject<HTMLInputElement>;
  sku: React.RefObject<HTMLInputElement>;
}

const AddProdducts: React.FC = () => {
  const name = useRef<HTMLInputElement>(null);
  const [tagsList, setTagsList] = useState<string[]>([]);
  const [sizeList, setSizeList] = useState<string[]>([]);
  const [categoriesList, setCategoriesList] = useState<string[]>([]);
  const [subCategoriesList, setSubCategoriesList] = useState<string[]>([]);
  const [subSubCategoriesList, setSubSubCategoriesList] = useState<string[]>(
    []
  );

  const [openSubCatModal, setOpenSubCatModal] = useState(false);

  const [value, setValue] = useState("");

  const [imgToDisplay, setImgToDisplay] = useState<
    "shoes.jpg" | "shoes2.webp" | "shoes3.jpg" | "shoes4.jpeg"
  >("shoes.jpg");

  const handelChangeImg = (
    img: "shoes.jpg" | "shoes2.webp" | "shoes3.jpg" | "shoes4.jpeg"
  ) => {
    setImgToDisplay(img);
  };

  const handelCatSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (categoriesList.includes(e.target.value)) return;
    setCategoriesList((prev) => [...prev, e.target.value]);
  };

  const handelCancelCatSelect = (select: string) => {
    setCategoriesList((prev) => prev.filter((item) => item !== select));
  };

  const router = useRouter();

  return (
    <>
      <Modal
        isOpen={openSubCatModal}
        style={customStyles}
        onRequestClose={() => setOpenSubCatModal(false)}
      >
        <div className={styles.subCatModal}>
          <TagsSelector
            label="Add Sub Category"
            listState={subCategoriesList}
            setListState={setSubCategoriesList}
          />
          <TagsSelector
            label="Add Sub Sub Category"
            listState={subSubCategoriesList}
            setListState={setSubSubCategoriesList}
          />
          <Button>Save</Button>
        </div>
      </Modal>
      <div className={styles.addProducts}>
        <div className={styles.nav}>
          <Button
            icon={<TbArrowBack />}
            onClick={() => {
              router.back();
            }}
          >
            Back
          </Button>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            <div>
              <h1>Add Product</h1>
            </div>
            <div className={styles.mainForm}>
              <form>
                <div className={styles.upperPart}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "15px",
                    }}
                  >
                    <IntputField label="Product's Name" />
                    <IntputField label="Price" />
                    <div className={styles.discount}>
                      <IntputField label="Discount" type={"number"} />
                      <select>
                        <option value={"percentage"}>percentage</option>
                        <option value={"amount"}>amount</option>
                      </select>
                    </div>
                    <IntputField label="Total Stock" type={"number"} />
                    <div className={styles.dealsSection}>
                      <h2>Add to offer</h2>
                      <div className={styles.offers}>
                        <select>
                          <option value={undefined}>None</option>
                          <option value="Dashain Offer">Dashain Offer</option>
                          <option value="Big Sale">Big Sale</option>
                          <option value="Flash Sale">Flash Sale</option>
                        </select>
                      </div>
                    </div>
                    <div className={styles.selectors}>
                      <TagsSelector
                        label="Sizes"
                        listState={sizeList}
                        setListState={setSizeList}
                      />
                      <TagsSelector
                        label="Tags"
                        listState={tagsList}
                        setListState={setTagsList}
                      />
                      <div className={styles.catSelector}>
                        <div className={styles.categoriesSelect}>
                          <div className={styles.label}>Add catogries</div>
                          <select onChange={handelCatSelect}>
                            <option value={"Women's Fashion"}>
                              Women's Fashion
                            </option>
                            <option value={"Men's Fashion"}>
                              Men's Fashion
                            </option>
                            <option value={"Electronic Devices"}>
                              Electronic Devices
                            </option>
                            <option value={"Health & Fitness"}>
                              Health & Fitness
                            </option>
                            <option value={"Games"}>Games</option>
                            <option value={"Gazabko Drinks"}>
                              Gazabko Drinks
                            </option>
                          </select>
                          <div className={styles.selectedItem}>
                            {categoriesList.map((cat, i) => (
                              <SelectedItemHolder
                                content={cat}
                                key={i}
                                onCancel={() => {
                                  handelCancelCatSelect(cat);
                                }}
                              />
                            ))}
                          </div>
                        </div>
                        {categoriesList.length !== 0 && (
                          <Button
                            onClick={() => {
                              setOpenSubCatModal(true);
                            }}
                          >
                            Add Sub-Categories
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={styles.imagesContainer}>
                    <div className={styles.img}>
                      <Image
                        src={`/images/${imgToDisplay}`}
                        width={400}
                        height={300}
                        objectFit="cover"
                      />
                      <div className={styles.extraImageHolder}>
                        <Image
                          src={"/images/shoes.jpg"}
                          height={50}
                          width={50}
                          objectFit="contain"
                          onClick={() => {
                            handelChangeImg("shoes.jpg");
                          }}
                        />
                        <Image
                          src={"/images/shoes2.webp"}
                          height={50}
                          width={50}
                          objectFit="contain"
                          onClick={() => {
                            handelChangeImg("shoes2.webp");
                          }}
                        />
                        <Image
                          src={"/images/shoes3.jpg"}
                          height={50}
                          width={50}
                          objectFit="contain"
                          onClick={() => {
                            handelChangeImg("shoes3.jpg");
                          }}
                        />
                        <Image
                          src={"/images/shoes4.jpeg"}
                          height={50}
                          width={50}
                          objectFit="contain"
                          onClick={() => {
                            handelChangeImg("shoes4.jpeg");
                          }}
                        />
                        <div className={styles.addPictures}>+</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.skuAndBrand}>
                  <IntputField label="SKU" type={"number"} />
                  <IntputField label="Brand" />
                </div>
                <div className={styles.producttDetails}>
                  <h2>Product Details</h2>
                  <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    className={styles.textEditor}
                  />
                  ;
                </div>
                <div className={styles.actBtn}>
                  <Button color="success">Save</Button>
                  <Button>View</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProdducts;
