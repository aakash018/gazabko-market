import React from "react";
import AdminLayout from "../../../components/Admin/AdminNav";
import Image from "next/image";

import styles from "../../../styles/components/Admin/pages/SellerInfoPage.module.scss";
import { BsStarFill } from "react-icons/bs";
import ProductHolder from "../../../components/shared/Customer/ProductHolder";
import ShowCase from "../../../components/Customer/ShowCase";
import Button from "../../../components/shared/Button";
import { useRouter } from "next/router";

const SellerInfoPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  console.log(name);

  return (
    <AdminLayout>
      <div className={styles.sellerInfoPage}>
        <div className={styles.profileImg}>
          <Image
            src="/images/placeHolders/placeHolder.jpeg"
            width={150}
            height={150}
          />
        </div>
        <div className={styles.headerInfo}>
          <div className={styles.name}>Dakshinkali Desgigner Store</div>
          <div className={styles.address}>Lekhnath Metro ,9 Newroad.</div>
          <div className={styles.rating}>
            <BsStarFill />
            <span>4.6</span>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.data}>
            <div className={styles.infoHolder}>
              <span className={styles.infoTitle}>Status: </span>
              <span className={`${styles.infoContent} ${styles.verified}`}>
                Verified
              </span>
            </div>
            <div className={styles.infoHolder}>
              <span className={styles.infoTitle}>Signed Up Date: </span>
              <span className={`${styles.infoContent}`}>2 Feb 2022</span>
            </div>
            <div className={styles.infoHolder}>
              <span className={styles.infoTitle}>Verified Date: </span>
              <span className={`${styles.infoContent}`}>10 Feb 2022</span>
            </div>
            <div className={styles.infoHolder}>
              <span className={styles.infoTitle}>Total Products Sold: </span>
              <span className={`${styles.infoContent}`}>48</span>
            </div>
            <div className={styles.infoHolder}>
              <span className={styles.infoTitle}>
                Total Products sold this month:{" "}
              </span>
              <span className={`${styles.infoContent}`}>12</span>
            </div>
            <div className={styles.infoHolder}>
              <span className={styles.infoTitle}>
                Total Customers Sold to:{" "}
              </span>
              <span className={`${styles.infoContent}`}>15</span>
            </div>
            <div className={styles.infoHolder}>
              <span className={styles.infoTitle}>Total Items added: </span>
              <span className={`${styles.infoContent}`}>36</span>
            </div>
            <div className={styles.infoHolder}>
              <span className={styles.infoTitle}>
                Store Visites this month:{" "}
              </span>
              <span className={`${styles.infoContent}`}>6</span>
            </div>
          </div>
          <div className={styles.newItemAdded}>
            <div className={styles.title}>Newest Items Addded</div>
            <div className={styles.itemsShowcase}>
              <ProductHolder
                productName="Random Product"
                discount={0}
                mp={1000}
                rating={4.1}
              />
              <ProductHolder
                productName="Random Product"
                discount={0}
                mp={1000}
                rating={4.1}
              />
            </div>
          </div>
        </div>
        <div className={styles.topSoldItems}>
          <ShowCase title="Most Sold Items" noOfProducts={4} />
        </div>
        <div className={styles.actBtn}>
          <Button>View Full Store</Button>
          {id !== "diact" && <Button color="error">Deactivate Seller</Button>}
          {id === "diact" && <Button color="success">Reactivate Seller</Button>}
          {id === "diact" && <Button color="error">Delete Seller</Button>}
        </div>
      </div>
    </AdminLayout>
  );
};

export default SellerInfoPage;
