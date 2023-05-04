import React, { useEffect, useState } from "react";
import SellerNav from "../../../components/Seller/SellerNav";
import Button from "../../../components/shared/Button";
import Router, { useRouter } from "next/router";

import Image from "next/image";

import styles from "../../../styles/components/Seller/pages/ProductDetails.module.scss";
import axios from "axios";
import { ProtuctType } from "../../../@types/global";
import { useAlert } from "../../_app";
import Modal from "react-modal";
import { customStyles } from "../../../modalStyle";
import DialogBox from "../../../components/shared/DialogBox";

const ProductDetails = () => {
  const router = useRouter();
  const { id, pid } = router.query;
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [imgURL, setImgUrl] = useState("/images/shoes.jpg");
  const [productInfo, setProductInfo] = useState<ProtuctType | null>(null);

  const [hideVerifyModal, setHideVerifyModal] = useState(false);
  const [banOrUnban, setBanOrUnban] = useState<"hide" | "unhide">();

  const { setAlert } = useAlert();
  const handleCorsoulChange = (url: string) => {
    setImgUrl(url);
  };
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get<RespondType & { product?: ProtuctType }>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/products/info`,
        {
          params: { pid },
          withCredentials: true,
        }
      );
      setLoading(false);
      if (res.data.status === "ok" && res.data.product) {
        setProductInfo(res.data.product);
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setLoading(false);
      setAlert({
        type: "error",
        message: "failed to fetch product info",
      });
    }
  };
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      fetchProduct();
    }
    return () => {
      ignore = true;
    };
  }, [pid]);

  const handelHideProduct = async () => {
    try {
      setBtnLoading(true);
      setHideVerifyModal(false);
      const res = await axios.put<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/products/hideProduct`,
        {
          productID: pid,
        },
        { withCredentials: true }
      );
      setBtnLoading(false);
      if (res.data.status === "ok") {
        setAlert({
          type: "message",
          message: res.data.message,
        });
        fetchProduct();
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setBtnLoading(false);
      setAlert({
        type: "error",
        message: "failed to hide the product",
      });
    }
  };

  const handelUnhideProduct = async () => {
    try {
      setBtnLoading(true);
      setHideVerifyModal(false);

      const res = await axios.put<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/products/unhideProduct`,
        {
          productID: pid,
        },
        { withCredentials: true }
      );
      setBtnLoading(false);
      if (res.data.status === "ok") {
        setAlert({
          type: "message",
          message: res.data.message,
        });
        fetchProduct();
      } else {
        setAlert({
          type: "error",
          message: res.data.message,
        });
      }
    } catch {
      setBtnLoading(false);
      setAlert({
        type: "error",
        message: "failed to unhide the product",
      });
    }
  };
  return (
    <>
      <Modal
        isOpen={hideVerifyModal}
        onRequestClose={() => setHideVerifyModal(false)}
        style={customStyles}
      >
        <DialogBox title="Hide Product">
          <div className="confirmModal">
            <div className="content">
              Sure want to {banOrUnban} this product?
            </div>
            <div className="actBtn">
              <Button
                onClick={
                  banOrUnban === "hide"
                    ? handelHideProduct
                    : handelUnhideProduct
                }
              >
                Yes
              </Button>
              <Button color="error" onClick={() => setHideVerifyModal(false)}>
                No
              </Button>
            </div>
          </div>
        </DialogBox>
      </Modal>
      <SellerNav>
        <h1>Product Details</h1>
        {loading && <h2>Loading...</h2>}
        {!loading && productInfo && (
          <div className={styles.productDetails}>
            <div className={styles.info}>
              <div className={styles.infoGroup}>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>ID: </div>
                  <div className={styles.infoContent}>{productInfo?.id}</div>
                </div>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>Name: </div>
                  <div className={styles.infoContent}>{productInfo?.name}</div>
                </div>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>Price: </div>
                  <div className={styles.infoContent}>
                    Rs. {productInfo?.price}
                  </div>
                </div>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>Discount: </div>
                  <div className={styles.infoContent}>
                    Rs. {productInfo?.discount}
                  </div>
                </div>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>Price After Discount: </div>
                  <div className={styles.infoContent}>
                    Rs. {productInfo?.priceAfterDiscount}
                  </div>
                </div>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>Rating: </div>
                  <div className={styles.infoContent}>
                    {productInfo?.rating.toFixed(1)}
                  </div>
                </div>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>Remaining Stock: </div>
                  <div className={styles.infoContent}>
                    {productInfo?.totalStock}
                  </div>
                </div>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>Tags: </div>
                  <div className={styles.infoContent}>
                    {JSON.parse(productInfo.tags).map(
                      (tag: string, i: number) => (
                        <span key={i}>{tag}, </span>
                      )
                    )}
                  </div>
                </div>

                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>Included Offers: </div>
                  <div className={styles.infoContent}>N/A</div>
                </div>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>Categories: </div>
                  <div className={styles.infoContent}>
                    {productInfo.category ? productInfo.category.name : "N/A"}
                  </div>
                </div>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>Uploaded Date: </div>
                  <div className={styles.infoContent}>
                    {new Date(productInfo?.created_at).toDateString()}
                  </div>
                </div>
              </div>
              <div className={styles.infoGroup}>
                <div className={styles.infoHolder}>
                  <div className={styles.infoTitle}>Times Bought: </div>
                  <div className={styles.infoContent}>
                    {productInfo?.timesBought}
                  </div>
                </div>
                {/* <div className={styles.infoHolder}>
              <div className={styles.infoTitle}>Total User Bought: </div>
              <div className={styles.infoContent}>6</div>
            </div>
            <div className={styles.infoHolder}>
              <div className={styles.infoTitle}>Total Times Viewed: </div>
              <div className={styles.infoContent}>87</div>
            </div> */}
                {/* <div className={styles.infoHolder}>
              <div className={styles.infoTitle}>
                Totla Times Viewed this Month:{" "}
              </div>
              <div className={styles.infoContent}>16</div>
            </div> */}
              </div>
              {/* <div className={styles.infoGroup}>
              <div className={styles.infoHolder}>
                <div className={styles.infoTitle}>Reviews Written: </div>
                <div className={styles.infoContent}>8</div>
              </div>
              <div className={styles.infoHolder}>
                <div className={styles.infoTitle}>Reports Written: </div>
                <div className={styles.infoContent}>6</div>
              </div>
            </div> */}
              <div className={styles.infoGroup}>
                <div className={styles.actBtn}>
                  <Button
                    onClick={() => {
                      Router.push(`/products/id?pid=${pid}`);
                    }}
                  >
                    View Full Page
                  </Button>
                  {!productInfo?.isHidden && (
                    <Button
                      color="error"
                      onClick={() => {
                        setBanOrUnban("hide");
                        setHideVerifyModal(true);
                      }}
                      disable={btnLoading}
                    >
                      {btnLoading ? "Loading..." : "Hide Product"}
                    </Button>
                  )}
                  {productInfo?.isHidden && (
                    <>
                      <Button
                        color="success"
                        onClick={() => {
                          setBanOrUnban("unhide");
                          setHideVerifyModal(true);
                        }}
                        disable={btnLoading}
                      >
                        {btnLoading ? "Loading..." : "Unhide Product"}
                      </Button>
                      <Button color="error">Delete Product</Button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.img}>
              <div className={styles.mainImg}>
                <Image
                  src={imgURL}
                  width={350}
                  height={300}
                  objectFit="cover"
                />
              </div>
              <div className={styles.courselHolder}>
                <Image
                  src={"/images/shoes.jpg"}
                  width={50}
                  height={50}
                  onClick={() => handleCorsoulChange("/images/shoes.jpg")}
                />
                <Image
                  src={"/images/shoes2.webp"}
                  width={50}
                  height={50}
                  onClick={() => handleCorsoulChange("/images/shoes2.webp")}
                />
                <Image
                  src={"/images/shoes3.jpg"}
                  width={50}
                  height={50}
                  onClick={() => handleCorsoulChange("/images/shoes3.jpg")}
                />
                <Image
                  src={"/images/shoes4.jpeg"}
                  width={50}
                  height={50}
                  onClick={() => handleCorsoulChange("/images/shoes4.jpeg")}
                />
              </div>
            </div>
          </div>
        )}
      </SellerNav>
    </>
  );
};

export default ProductDetails;
