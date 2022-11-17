import React, { useRef, useState } from "react";
import AdminLayout from "../../../components/Admin/AdminNav";
import Image from "next/image";

import styles from "../../../styles/components/Admin/pages/SellerInfoPage.module.scss";
import { BsStarFill } from "react-icons/bs";
import ProductHolder from "../../../components/shared/Customer/ProductHolder";
import ShowCase from "../../../components/Customer/ShowCase";
import Button from "../../../components/shared/Button";
import { useRouter } from "next/router";
import { TableHolder } from "../orders";

import Modal from "react-modal";
import { customStyles } from "../../../modalStyle";
import IntputField from "../../../components/shared/Input";

interface TableDef {
  SN: number;
  "Product's Name": string;
  "Items Sold": number;
  "Stock Remaining": number;
  "Edit Commision": any;
  Details: any;
}

const SellerInfoPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [comissionRate, setCommisionRate] = useState("300");
  const [comissionRateModal, setCommisionRateModal] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);

  const [rowData] = useState<TableDef[]>([
    {
      SN: 1,
      "Product's Name": "Golden Magic Shoes",
      "Items Sold": 20,
      "Stock Remaining": 5,
      "Edit Commision": "",
      Details: "",
    },
    {
      SN: 2,
      "Product's Name": "Golden Magic Shoes",
      "Items Sold": 20,
      "Stock Remaining": 5,
      "Edit Commision": "",
      Details: "",
    },
    {
      SN: 3,
      "Product's Name": "Golden Magic Shoes",
      "Items Sold": 20,
      "Stock Remaining": 5,
      "Edit Commision": "",
      Details: "",
    },
    {
      SN: 4,
      "Product's Name": "Golden Magic Shoes",
      "Items Sold": 20,
      "Stock Remaining": 5,
      "Edit Commision": "",
      Details: "",
    },
    {
      SN: 5,
      "Product's Name": "Golden Magic Shoes",
      "Items Sold": 20,
      "Stock Remaining": 5,
      "Edit Commision": "",
      Details: "",
    },
    {
      SN: 6,
      "Product's Name": "Golden Magic Shoes",
      "Items Sold": 20,
      "Stock Remaining": 5,
      "Edit Commision": "",
      Details: "",
    },
    {
      SN: 7,
      "Product's Name": "Golden Magic Shoes",
      "Items Sold": 20,
      "Stock Remaining": 5,
      "Edit Commision": "",
      Details: "",
    },
    {
      SN: 8,
      "Product's Name": "Golden Magic Shoes",
      "Items Sold": 20,
      "Stock Remaining": 5,
      "Edit Commision": "",
      Details: "",
    },
    {
      SN: 9,
      "Product's Name": "Golden Magic Shoes",
      "Items Sold": 20,
      "Stock Remaining": 5,
      "Edit Commision": "",
      Details: "",
    },
  ]);
  const [columnDef] = useState([
    { field: "SN", width: 60 },
    { field: "Product's Name", resizable: true, width: 245 },
    { field: "Items Sold", width: 125 },
    { field: "Stock Remaining", width: 155 },
    {
      field: "Edit Commision",
      cellRenderer: () => (
        <div
          onClick={() => {
            setCommisionRateModal(true);
          }}
          style={{
            fontWeight: "bold",
            color: "var(--theme-color)",
          }}
        >
          Edit
        </div>
      ),
    },
    {
      field: "Details",
      width: 125,
      cellRenderer: () => (
        <div
          style={{
            fontWeight: "bold",
            color: "var(--theme-color)",
          }}
        >
          View
        </div>
      ),
    },
  ]);

  return (
    <AdminLayout>
      <Modal
        isOpen={comissionRateModal}
        style={customStyles}
        onRequestClose={() => {
          setCommisionRateModal(false);
        }}
      >
        <IntputField
          label="Commision Rate"
          setState={setCommisionRate}
          value={comissionRate}
        />
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "10px",
          }}
        >
          <Button>Save</Button>
          <Button
            color="error"
            onClick={() => {
              setCommisionRateModal(false);
            }}
          >
            Cancle
          </Button>
        </div>
      </Modal>
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
        <div
          className={styles.allItems}
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          <TableHolder
            columData={columnDef}
            rowData={rowData}
            inputRef={searchRef}
            title="All Products"
          />
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
