import Image from "next/image";
import React from "react";
import { ReportType, ReviewType } from "../../../@types/rrr";
import styles from "../../../styles/components/Admin/ProductReviewHolder.module.scss";
import Button from "../../shared/Button";
import axios from "axios";
import { useAlert } from "../../../pages/_app";
import Router from "next/router";

interface Props {
  showViewVendor?: boolean;
  report: ReportType;
  afterHideOrUnhide: () => void;
  type?: "seller" | "admin";
}

const ProductReportHolder: React.FC<Props> = ({
  showViewVendor = true,
  type = "seller",
  report,
  afterHideOrUnhide,
}) => {
  const { setAlert } = useAlert();

  const handleHideProduct = async () => {
    try {
      const res = await axios.put<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/products/hideProduct`,
        {
          productID: report.product?.id,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.status === "ok") {
        setAlert({
          type: "message",
          message: res.data.message,
        });
        afterHideOrUnhide();
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
  };

  const handleUnhideProduct = async () => {
    try {
      const res = await axios.put<RespondType>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/products/unhideProduct`,
        {
          productID: report.product?.id,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.status === "ok") {
        setAlert({
          type: "message",
          message: res.data.message,
        });
        afterHideOrUnhide();
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
  };

  return (
    <div className={styles.productReviewHolder}>
      <div className={styles.img}>
        <Image src={"/images/shoes.jpg"} width={200} height={200} />
      </div>
      <div className={styles.info}>
        <div className={styles.productName}>{report.product?.name}</div>
        <div className={styles.priceAndView}>
          <div className={styles.price}>Rs. 2200</div>
          <Button
            onClick={() => {
              Router.push(
                `/${type === "admin" ? "admin" : "seller"}/products/id?pid=${
                  report.product!.id
                }`
              );
            }}
          >
            View Product
          </Button>
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
          {!report.product?.isHidden && (
            <Button color="error" onClick={handleHideProduct}>
              Hide Product
            </Button>
          )}
          {report.product?.isHidden && (
            <Button onClick={handleUnhideProduct}>Unhide Product</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReportHolder;
