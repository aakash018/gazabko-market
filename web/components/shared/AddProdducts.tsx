import React, { useEffect, useRef, useState } from "react";

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
import {
  Category,
  ProtuctPayloadType,
  ProtuctType,
  SubCategory,
  SubSubCategory,
} from "../../@types/global";
import { useAlert } from "../../pages/_app";
import { GiH2O } from "react-icons/gi";

interface Props {
  type: "seller" | "admin";
  work?: "edit" | "add";
  pid?: any;
}

const AddProdducts: React.FC<Props> = ({ type, work, pid }) => {
  const { setAlert } = useAlert();

  const [tagsList, setTagsList] = useState<string[]>([]);
  const [sizeList, setSizeList] = useState<string[]>([]);

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [totalStock, setTotalStock] = useState("");
  const sizes = useRef<HTMLInputElement>(null);
  const [openSubCatModal, setOpenSubCatModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "amount">(
    "percentage"
  );
  const [sku, setSku] = useState("");
  const [brand, setBrand] = useState("");
  const [value, setValue] = useState("");
  const [images, setImages] = useState<any[]>([]);
  const [colorList, setColorList] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSubCat, setSelectedSubCat] = useState("");
  const [selectedSubSubCat, setSelectedSubSubCat] = useState("");

  const [product, setProduct] = useState<ProtuctType | null>(null);

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      (async () => {
        try {
          const res = await axios.get<RespondType & { categories: Category[] }>(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/category/getAllCategories`
          );

          if (res.data.status === "ok") {
            setCategories(res.data.categories);
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
      })();
    }

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!pid) return;
    (async () => {
      if (work === "edit") {
        try {
          setLoading(true);
          const res = await axios.get<RespondType & { product?: ProtuctType }>(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/products/getProductToEdit`,
            {
              params: {
                pid,
              },
              withCredentials: true,
            }
          );

          console.log(res.data);

          if (res.data.status === "ok" && res.data.product) {
            setProduct(res.data.product);

            setProductName(res.data.product.name);
            setPrice(res.data.product.price as unknown as string);
            setDiscount(res.data.product.discount as unknown as string);
            setTotalStock(res.data.product.totalStock as unknown as string);
            setSizeList(JSON.parse(res.data.product.sizes as any) as string[]);
            setColorList(JSON.parse(res.data.product.color as any) as string[]);
            setTagsList(JSON.parse(res.data.product.tags as any) as string[]);
            setSku(res.data.product.sku as unknown as string);
            setBrand(res.data.product.brand);
            if (res.data.product.category) {
              setSelectedCategory(res.data.product.category.name);

              setSelectedSubCat(
                res.data.product.category.subCatagories[0].name
              );
              setSelectedSubSubCat(
                res.data.product.category.subCatagories[0].subsubCategories[0]
                  .name
              );
            }

            setValue(res.data.product.description);
            setLoading(false);
          } else {
            setLoading(false);
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        } catch (e) {
          console.log(e);
          setLoading(true);
          setAlert({
            type: "error",
            message: "failed to connect to servers",
          });
        }
      }
    })();
  }, [pid]);

  const handelCatSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setSelectedSubCat("");
    setSelectedSubSubCat("");
  };

  const handleSubCatSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubCat(e.target.value);
    setSelectedSubSubCat("");
  };

  const handleSubSubCatSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubSubCat(e.target.value);
  };

  const handleSubmit = async () => {
    console.log(selectedCategory, selectedSubCat, selectedSubSubCat);
    if (
      productName.trim() === "" ||
      brand.trim() === "" ||
      price.trim() === "" ||
      totalStock.trim() === "" ||
      tagsList.length === 0 ||
      sku.trim() === "" ||
      images.length === 0 ||
      value.trim() === "" ||
      selectedCategory.trim() === "" ||
      selectedSubCat.trim() === "" ||
      selectedSubSubCat.trim() === ""
    ) {
      return setAlert({
        type: "error",
        message: "empty fields",
      });
    }

    let discountAmount = parseInt(discount) | 0;
    if (discountType === "percentage") {
      discountAmount = parseInt(price) * (parseInt(discount) / 100);
    }
    const payload: ProtuctPayloadType = {
      productName: productName,
      brand: brand,
      price: parseInt(price),
      totalStock: parseInt(totalStock),
      tags: JSON.stringify(tagsList),
      category: selectedCategory,
      subCategory: selectedSubCat,
      subsubCategory: selectedSubSubCat,
      sku: parseInt(sku),
      images: JSON.stringify(images),
      description: value,
      discount: discountAmount,
      sizes: JSON.stringify(sizeList),
      color: JSON.stringify(colorList),
    };

    const res = await axios.post<{ status: "ok" | "fail"; message: string }>(
      `${
        type === "seller"
          ? `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/products/add`
          : `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/products/addProduct`
      }`,
      payload,
      { withCredentials: true }
    );

    if (res.data.status === "ok") {
      setAlert({
        type: "message",
        message: res.data.message,
      });
      type === "seller"
        ? Router.push("/seller/products")
        : Router.push("/admin/products");
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
          <Button>Save</Button>
        </div>
      </Modal>
      {loading && <h2>Loading...</h2>}
      {!loading && (
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
                      <IntputField
                        label="Product's Name"
                        setState={setProductName}
                        value={productName}
                      />
                      <IntputField
                        label="Price"
                        setState={setPrice}
                        value={price}
                      />
                      <div className={styles.discount}>
                        <IntputField
                          label="Discount"
                          type={"number"}
                          setState={setDiscount}
                          value={discount}
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
                        value={totalStock}
                        setState={setTotalStock}
                      />
                      {/* <div className={styles.dealsSection}>
                        <h2>Add to offer</h2>
                        <div className={styles.offers}>
                          <select>
                            <option value={undefined}>None</option>
                            <option value="Dashain Offer">Dashain Offer</option>
                            <option value="Big Sale">Big Sale</option>
                            <option value="Flash Sale">Flash Sale</option>
                          </select>
                        </div>
                      </div> */}
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
                            <select
                              onChange={handelCatSelect}
                              value={selectedCategory}
                            >
                              <option
                                value=""
                                disabled
                                selected={work === "add"}
                                hidden
                              >
                                Select an option
                              </option>
                              {categories.map((cat, i) => (
                                <option value={cat.name} key={i}>
                                  {cat.name}
                                </option>
                              ))}
                            </select>
                            {/* <div className={styles.selectedItem}>
                              {categoriesList.map((cat, i) => (
                                <SelectedItemHolder
                                  content={cat}
                                  key={i}
                                  onCancel={() => {
                                    handelCancelCatSelect(cat);
                                  }}
                                />
                              ))}
                            </div> */}
                          </div>
                        </div>
                        {selectedCategory.trim() !== "" && (
                          <>
                            <h3>Select Sub Category</h3>
                            <select
                              onChange={handleSubCatSelect}
                              value={selectedSubCat}
                            >
                              <option value="" disabled selected hidden>
                                Select an option
                              </option>
                              {categories.length !== 0 &&
                                selectedCategory !== "" &&
                                categories
                                  .filter(
                                    (cat) => cat.name === selectedCategory
                                  )[0]
                                  .subCatagories.map((subcat, i) => (
                                    <option value={subcat.name} key={i}>
                                      {subcat.name}
                                    </option>
                                  ))}
                            </select>
                          </>
                        )}
                        {selectedSubCat.trim() !== "" && (
                          <>
                            <h3>Select Sub Sub Category</h3>
                            <select
                              onChange={handleSubSubCatSelect}
                              value={selectedSubSubCat}
                            >
                              <option value="" disabled selected hidden>
                                Select an option
                              </option>

                              {categories.length !== 0 &&
                                selectedCategory !== "" &&
                                categories
                                  .filter(
                                    (cat) => cat.name === selectedCategory
                                  )[0]
                                  .subCatagories.filter(
                                    (subcat) => subcat.name === selectedSubCat
                                  )[0]
                                  .subsubCategories.map((subcat, i) => (
                                    <option value={subcat.name} key={i}>
                                      {subcat.name}
                                    </option>
                                  ))}
                            </select>
                          </>
                        )}
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
                    <IntputField
                      label="SKU"
                      type={"number"}
                      value={sku}
                      setState={setSku}
                    />
                    <IntputField
                      label="Brand"
                      value={brand}
                      setState={setBrand}
                    />
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
                    {work === "add" && (
                      <Button color="success" onClick={handleSubmit}>
                        Save
                      </Button>
                    )}
                    {work === "edit" && <Button>Update</Button>}
                    <Button>View</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProdducts;
