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

import Router, { useRouter } from "next/router";

import Modal from "react-modal";
import { customStyles } from "../../modalStyle";
import SelectedItemHolder from "../Admin/shared/SelectedItemHolder";
import MultipleImageUploader from "./MultipleImageUploader";
import axios from "axios";
import { ProtuctPayloadType } from "../../@types/global";
import { useAlert } from "../../pages/_app";

const AddProdducts: React.FC = () => {
  const { setAlert } = useAlert();

  const [tagsList, setTagsList] = useState<string[]>([]);
  const [sizeList, setSizeList] = useState<string[]>([]);
  const [categoriesList, setCategoriesList] = useState<string[]>([]);
  const [subCategoriesList, setSubCategoriesList] = useState<string[]>([]);
  const [subSubCategoriesList, setSubSubCategoriesList] = useState<string[]>(
    []
  );

  const productName = useRef<HTMLInputElement>(null);
  const price = useRef<HTMLInputElement>(null);
  const discount = useRef<HTMLInputElement>(null);
  const totalStock = useRef<HTMLInputElement>(null);
  const sizes = useRef<HTMLInputElement>(null);
  const [openSubCatModal, setOpenSubCatModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "amount">(
    "percentage"
  );
  const sku = useRef<HTMLInputElement>(null);
  const brand = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [images, setImages] = useState<any[]>([]);
  const [colorList, setColorList] = useState<string[]>([]);

  const handelCatSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (categoriesList.includes(e.target.value)) return;
    setCategoriesList((prev) => [...prev, e.target.value]);
  };

  const handelCancelCatSelect = (select: string) => {
    setCategoriesList((prev) => prev.filter((item) => item !== select));
  };

  const handleSubmit = async () => {
    if (
      productName.current?.value.trim() === "" ||
      brand.current?.value.trim() === "" ||
      price.current?.value.trim() === "" ||
      totalStock.current?.value.trim() === "" ||
      tagsList.length === 0 ||
      categoriesList.length === 0 ||
      sku.current?.value.trim() === "" ||
      images.length === 0 ||
      value.trim() === ""
    ) {
      return setAlert({
        type: "error",
        message: "empty fields",
      });
    }

    let discountAmount = parseInt(discount.current!.value) | 0;
    if (discountType === "percentage") {
      discountAmount =
        parseInt(price.current!.value) *
        (parseInt(discount.current!.value) / 100);
    }
    const payload: ProtuctPayloadType = {
      productName: productName.current!.value,
      brand: brand.current!.value,
      price: parseInt(price.current!.value),
      totalStock: parseInt(totalStock.current!.value),
      tags: JSON.stringify(tagsList),
      category: JSON.stringify(categoriesList),
      subCategory: JSON.stringify(subCategoriesList),
      sku: parseInt(sku.current!.value),
      images: JSON.stringify(images),
      description: value,
      discount: discountAmount,
      sizes: JSON.stringify(sizeList),
      color: JSON.stringify(colorList),
    };

    const res = await axios.post<{ status: "ok" | "fail"; message: string }>(
      `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/products/add`,
      payload,
      { withCredentials: true }
    );

    if (res.data.status === "ok") {
      setAlert({
        type: "message",
        message: res.data.message,
      });
      Router.push("/seller/products");
    } else {
      setAlert({
        type: "error",
        message: res.data.message,
      });
    }
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
                    <IntputField label="Product's Name" input={productName} />
                    <IntputField label="Price" input={price} />
                    <div className={styles.discount}>
                      <IntputField
                        label="Discount"
                        type={"number"}
                        input={discount}
                      />
                      <select
                        onChange={(e) => {
                          setDiscountType(
                            e.target.value as "percentage" | "amount"
                          );
                        }}
                        value={discountType}
                      >
                        <option value={"percentage"}>percentage</option>
                        <option value={"amount"}>amount</option>
                      </select>
                    </div>
                    <IntputField
                      label="Total Stock"
                      type={"number"}
                      input={totalStock}
                    />
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
                        label="Color"
                        listState={colorList}
                        setListState={setColorList}
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
                    <MultipleImageUploader
                      width={200}
                      height={200}
                      selectedImage={selectedImage}
                      setSelectedImage={setSelectedImage}
                      images={images}
                      setImages={setImages}
                    />
                  </div>
                </div>
                <div className={styles.skuAndBrand}>
                  <IntputField label="SKU" type={"number"} input={sku} />
                  <IntputField label="Brand" input={brand} />
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
                  <Button color="success" onClick={handleSubmit}>
                    Save
                  </Button>
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
