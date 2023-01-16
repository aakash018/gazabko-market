import React, { useEffect, useState } from "react";
import SellerNav from "../../../components/Seller/SellerNav";
import Button from "../../../components/shared/Button";
import Router, { useRouter } from "next/router";

import Image from "next/image";

import styles from "../../../styles/components/Seller/pages/ProductDetails.module.scss";
import axios from "axios";
import { ProtuctType } from "../../../@types/global";
import { useAlert } from "../../_app";

const ProductDetails = () => {
  const router = useRouter();
  const { id, pid } = router.query;
  const [loading, setLoading] = useState(false);
  const [imgURL, setImgUrl] = useState("/images/shoes.jpg");
  const [productInfo, setProductInfo] = useState<ProtuctType | null>(null);
  const { setAlert } = useAlert();
  const handleCorsoulChange = (url: string) => {
    setImgUrl(url);
  };

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      (async () => {
        try {
          const res = await axios.get<RespondType & { product?: ProtuctType }>(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/products/info`,
            {
              params: { pid },
              withCredentials: true,
            }
          );
          if (res.data.status === "ok" && res.data.product) {
            setProductInfo(res.data.product);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        } catch {
          setAlert({
            type: "error",
            message: "failed to fetch product info",
          });
        }
      })();
    }
    return () => {
      ignore = true;
    };
  }, [pid]);

  return (
    <SellerNav>
      <h1>Product Details</h1>
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
              <div className={styles.infoContent}>Rs. {productInfo?.price}</div>
            </div>
            <div className={styles.infoHolder}>
              <div className={styles.infoTitle}>Remaining Stock: </div>
              <div className={styles.infoContent}>
                {productInfo?.totalStock}
              </div>
            </div>

            <div className={styles.infoHolder}>
              <div className={styles.infoTitle}>Included Offers: </div>
              <div className={styles.infoContent}>N/A</div>
            </div>
            <div className={styles.infoHolder}>
              <div className={styles.infoTitle}>Categories: </div>
              <div className={styles.infoContent}>Shoes, Men, Gold-Star</div>
            </div>
            <div className={styles.infoHolder}>
              <div className={styles.infoTitle}>Uploaded Date: </div>
              <div className={styles.infoContent}>
                {productInfo?.created_at}
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
          <div className={styles.infoGroup}>
            <div className={styles.infoHolder}>
              <div className={styles.infoTitle}>Reviews Written: </div>
              <div className={styles.infoContent}>8</div>
            </div>
            <div className={styles.infoHolder}>
              <div className={styles.infoTitle}>Reports Written: </div>
              <div className={styles.infoContent}>6</div>
            </div>
          </div>
          <div className={styles.infoGroup}>
            <div className={styles.actBtn}>
              <Button
                onClick={() => {
                  Router.push(`/products/${pid}`);
                }}
              >
                View Full Page
              </Button>
              {id !== "diact" && <Button color="error">Hide Product</Button>}
              {id === "diact" && (
                <>
                  <Button color="success">Unhide Product</Button>
                  <Button color="error">Delete Product</Button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={styles.img}>
          <div className={styles.mainImg}>
            <Image src={imgURL} width={350} height={300} objectFit="cover" />
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
    </SellerNav>
  );
};

export default ProductDetails;
