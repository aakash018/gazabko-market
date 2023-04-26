import Image from "next/image";
import React from "react";
import { ReportType, ReviewType } from "../../../@types/rrr";
import styles from "../../../styles/components/Admin/ProductReviewHolder.module.scss";
import Button from "../../shared/Button";

interface Props {
  showViewVendor?: boolean;
  report: ReportType;
}

const ProductReportHolder: React.FC<Props> = ({
  showViewVendor = true,
  report,
}) => {
  return (
    <div className={styles.productReviewHolder}>
      <div className={styles.img}>
        <Image src={"/images/shoes.jpg"} width={200} height={200} />
      </div>
      <div className={styles.info}>
        <div className={styles.productName}>{report.product?.name}</div>
        <div className={styles.priceAndView}>
          <div className={styles.price}>Rs. 2200</div>
          <Button>View Product</Button>
        </div>
        <div className={styles.review}>
          <div className={styles.header}>
            <div className={styles.profile}>
              <div className={styles.profilePic}>
                <Image src={report.user!.avatar} width={50} height={50} />
              </div>
              <div className={styles.nameAndDate}>
                <div className={styles.name}>{report.user!.firstName}</div>
                <div className={styles.date}>
                  {report.created_at.split("T")[0]}
                </div>
              </div>
            </div>
            <div className={styles.tag}>{report.title}</div>
          </div>
          <div className={styles.content}>{report.report}</div>
        </div>
        <div className={styles.actBtn}>
          {/* <Button color="success">Dismiss</Button> */}
          {/* {showViewVendor && <Button color="default">View Vender</Button>} */}
          <Button color="error">Hide Product</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductReportHolder;
