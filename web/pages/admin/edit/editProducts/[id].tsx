import Image from "next/image";
import React, { useState } from "react";
import AdminLayout from "../../../../components/Admin/AdminNav";
import Button from "../../../../components/shared/Button";

import styles from "../../../../styles/components/Admin/pages/ProductDetails.module.scss";

const ProductDetails = () => {
  const [imgURL, setImgUrl] = useState("/images/shoes.jpg");

  const handleCorsoulChange = (url: string) => {
    setImgUrl(url);
  };

  return (
    <AdminLayout>
      <h1>Product Details</h1>
      <div className={styles.productDetails}>
        <div className={styles.info}>
          <div className={styles.infoGroup}>
            <div className={styles.infoHolder}>
              <div className={styles.infoTitle}>ID: </div>
              <div className={styles.infoContent}>654321684486565</div>
            </div>
            <div className={styles.infoHolder}>
              <div className={styles.infoTitle}>Name: </div>
              <div className={styles.infoContent}>
                Goldstar G10 Starlite 4 Black/Red Shoes For Men
              </div>
            </div>
            <div className={styles.infoHolder}>
              <div className={styles.infoTitle}>Price: </div>
              <div className={styles.infoContent}>Rs. 22,000</div>
            </div>
            <div className={styles.infoHolder}>
              <div className={styles.infoTitle}>Remaining Stock: </div>
              <div className={styles.infoContent}>22</div>
            </div>
            <div className={styles.infoHolder}>
              <div className={styles.infoTitle}>Vendor: </div>
              <div className={styles.infoContent}>
                Dakshinkali Desgigner Store
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
              <div className={styles.infoContent}>22 June 2022</div>
            </div>
          </div>
          <div className={styles.infoGroup}>
            <div className={styles.infoHolder}>
              <div className={styles.infoTitle}>Times Bought: </div>
              <div className={styles.infoContent}>22</div>
            </div>
            <div className={styles.infoHolder}>
              <div className={styles.infoTitle}>Total User Bought: </div>
              <div className={styles.infoContent}>6</div>
            </div>
            <div className={styles.infoHolder}>
              <div className={styles.infoTitle}>Total Times Viewed: </div>
              <div className={styles.infoContent}>87</div>
            </div>
            <div className={styles.infoHolder}>
              <div className={styles.infoTitle}>
                Totla Times Viewed this Month:{" "}
              </div>
              <div className={styles.infoContent}>16</div>
            </div>
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
    </AdminLayout>
  );
};

export default ProductDetails;
