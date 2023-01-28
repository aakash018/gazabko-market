import Image from "next/image";
import React, { useEffect, useState } from "react";

import styles from "../../../styles/components/Admin/pages/ProductDetails.module.scss";
import AdminLayout from "../../../components/Admin/AdminNav";
import Button from "../../../components/shared/Button";
import { useRouter } from "next/router";
import { ProtuctType } from "../../../@types/global";
import axios from "axios";
import { useAlert } from "../../_app";

const ProductDetails = () => {
  const [imgURL, setImgUrl] = useState("/images/shoes.jpg");
  const router = useRouter();
  const { id, pid } = router.query;

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProtuctType | null>(null);
  const { setAlert } = useAlert();

  const handleCorsoulChange = (url: string) => {
    setImgUrl(url);
  };

  useEffect(() => {
    let ignore = false;
    if (!ignore && pid) {
      (async () => {
        try {
          setLoading(true);
          const res = await axios.get<RespondType & { product?: ProtuctType }>(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/products/oneProductDetail`,
            {
              withCredentials: true,
              params: { pid },
            }
          );
          setLoading(false);
          if (res.data.status === "ok" && res.data.product) {
            setProduct(res.data.product);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        } catch {
          setAlert({
            type: "error",
            message: "failed to load product info",
          });
        }
      })();
    }
    return () => {
      ignore = true;
    };
  }, [pid]);

  return (
    <AdminLayout>
      <h1>Product Details</h1>
      {loading && <h2>Loading...</h2>}
      {!loading && product && (
        <div className={styles.productDetails}>
          <div className={styles.info}>
            <div className={styles.infoGroup}>
              <div className={styles.infoHolder}>
                <div className={styles.infoTitle}>ID: </div>
                <div className={styles.infoContent}>{product.id}</div>
              </div>
              <div className={styles.infoHolder}>
                <div className={styles.infoTitle}>Name: </div>
                <div className={styles.infoContent}>{product.name}</div>
              </div>
              <div className={styles.infoHolder}>
                <div className={styles.infoTitle}>Price: </div>
                <div className={styles.infoContent}>Rs. {product.price}</div>
              </div>
              <div className={styles.infoHolder}>
                <div className={styles.infoTitle}>Discount: </div>
                <div className={styles.infoContent}>Rs. {product.discount}</div>
              </div>
              <div className={styles.infoHolder}>
                <div className={styles.infoTitle}>Price After Discount: </div>
                <div className={styles.infoContent}>
                  Rs. {product.priceAfterDiscount}
                </div>
              </div>
              <div className={styles.infoHolder}>
                <div className={styles.infoTitle}>Remaining Stock: </div>
                <div className={styles.infoContent}>{product.totalStock}</div>
              </div>
              <div className={styles.infoHolder}>
                <div className={styles.infoTitle}>Vendor: </div>
                <div className={styles.infoContent}>{product.store}</div>
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
                <div className={styles.infoContent}>{product.created_at}</div>
              </div>
            </div>
            <div className={styles.infoGroup}>
              <div className={styles.infoHolder}>
                <div className={styles.infoTitle}>Times Bought: </div>
                <div className={styles.infoContent}>{product.timesBought}</div>
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
                <div className={styles.infoContent}>
                  {(product as any).reviewsCount}
                </div>
              </div>
              <div className={styles.infoHolder}>
                <div className={styles.infoTitle}>Reports Written: </div>
                <div className={styles.infoContent}>6</div>
              </div>
            </div>
            <div className={styles.infoGroup}>
              <div className={styles.actBtn}>
                <Button>View Full Page</Button>
                <Button color="error">Hide Product</Button>
                <Button>View Vendor</Button>
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
      )}
    </AdminLayout>
  );
};

export default ProductDetails;
