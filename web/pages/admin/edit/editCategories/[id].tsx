import Image from "next/image";
import React, { useState } from "react";
import AdminLayout from "../../../../components/Admin/AdminNav";
import DashInfoHolder from "../../../../components/Admin/DashInfoHolder";
import LineGraphInfo from "../../../../components/Admin/shared/LineGraphInfo";

import styles from "../../../../styles/components/Admin/pages/CategoryDetails.module.scss";
import { TableHolder } from "../../orders";

type TableDef = {
  SN: number;
  "Vendor's Name": string;
  Products: number;
  "Items Sold": number;
  "Total Sales": string;
};

const CategoryDetails = () => {
  const [rowData] = useState<TableDef[]>([
    {
      SN: 1,
      "Vendor's Name": "Laxmi Store",
      "Total Sales": "Rs. 4,500",
      "Items Sold": 12,
      Products: 10,
    },
    {
      SN: 2,
      "Vendor's Name": "Laxmi Store",
      "Total Sales": "Rs. 4,500",
      "Items Sold": 12,
      Products: 10,
    },
    {
      SN: 3,
      "Vendor's Name": "Laxmi Store",
      "Total Sales": "Rs. 4,500",
      "Items Sold": 12,
      Products: 10,
    },
    {
      SN: 4,
      "Vendor's Name": "Laxmi Store",
      "Total Sales": "Rs. 4,500",
      "Items Sold": 12,
      Products: 10,
    },
    {
      SN: 5,
      "Vendor's Name": "Laxmi Store",
      "Total Sales": "Rs. 4,500",
      "Items Sold": 12,
      Products: 10,
    },
    {
      SN: 6,
      "Vendor's Name": "Laxmi Store",
      "Total Sales": "Rs. 4,500",
      "Items Sold": 12,
      Products: 10,
    },
    {
      SN: 7,
      "Vendor's Name": "Laxmi Store",
      "Total Sales": "Rs. 4,500",
      "Items Sold": 12,
      Products: 10,
    },
    {
      SN: 8,
      "Vendor's Name": "Laxmi Store",
      "Total Sales": "Rs. 4,500",
      "Items Sold": 12,
      Products: 10,
    },
  ]);

  const [columnDefs] = useState([
    { field: "SN", width: 55 },
    { field: "Vendor's Name", resizable: true, width: 200 },
    { field: "Products", width: 115 },
    { field: "Items Sold", width: 115 },
    { field: "Total Sales", width: 115 },
  ]);

  return (
    <AdminLayout>
      <div className={styles.categoryDetails}>
        <h1>Category Details</h1>
        <div className={styles.catBanner}>
          <Image
            src={"/images/catogries/bar.jpg"}
            layout="fill"
            objectFit="cover"
            objectPosition={"top"}
          />
          <div className={styles.label}>
            <div className={styles.name}>Gazaabko Bar</div>
            <div className={styles.info}>
              <div className={styles.infoHolder}>
                <div className={styles.tag}>Products</div>
                <div className={styles.amount}>28</div>
              </div>
              <div className={styles.infoHolder}>
                <div className={styles.tag}>Vendors</div>
                <div className={styles.amount}>8</div>
              </div>
              <div className={styles.infoHolder}>
                <div className={styles.tag}>Items SoldLast Month</div>
                <div className={styles.amount}>54</div>
              </div>
              <div className={styles.infoHolder}>
                <div className={styles.tag}>Total Sales Last Month</div>
                <div className={styles.amount}>Rs. 28,000</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.data}>
          {/* <div className={styles.doughnutCharts}>
            <DashInfoHolder
              totalEarning={28000}
              title="Total Sales"
              first={{
                name: "8848 Vodka",
                amount: 12_500,
              }}
              second={{
                name: "Khukuri Rum",
                amount: 13000,
              }}
              third={{
                name: "Golden Oak",
                amount: 8000,
              }}
              onClick={() => {}}
            />
            <LineGraphInfo subTitle={"Page Visits Last Month"} amount={15} />
          </div>
          <div className={styles.table}>
            <TableHolder
              inputRef={null}
              title={"Vendors"}
              rowData={rowData}
              columData={columnDefs}
              width={610}
            />
          </div>
        </div> */}
        </div>
      </div>
    </AdminLayout>
  );
};

export default CategoryDetails;
