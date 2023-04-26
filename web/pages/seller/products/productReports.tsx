import React, { useEffect, useState } from "react";

import SellerNav from "../../../components/Seller/SellerNav";

import styles from "../../../styles/components/Seller/pages/ProductReports.module.scss";
import axios from "axios";
import { ReportType } from "../../../@types/rrr";
import { useAlert } from "../../_app";
import { GiH2O } from "react-icons/gi";
import ProductReportHolder from "../../../components/Admin/shared/ProductReportHolder";

const ProductReports = () => {
  const [reports, setReports] = useState<ReportType[]>([]);
  const [loading, setLoading] = useState(false);
  const { setAlert } = useAlert();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get<RespondType & { reports: ReportType[] }>(
          `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/products/getReports`,
          {
            withCredentials: true,
          }
        );
        setLoading(false);

        if (res.data.status === "ok") {
          setReports(res.data.reports);
        } else {
          setAlert({
            type: "error",
            message: res.data.message,
          });
        }
      } catch (e) {
        setLoading(false);
        setAlert({
          type: "error",
          message: "failed to connect to servers",
        });
      }
    })();
  }, []);

  return (
    <SellerNav>
      <h1>Products Reported</h1>
      <div className={styles.productsReported}>
        {loading && <h2>Loading...</h2>}
        {!loading && reports.length === 0 && <h2>No reports found</h2>}
        {!loading &&
          reports.length !== 0 &&
          reports.map((report, i) => (
            <ProductReportHolder report={report} key={i} />
          ))}
      </div>
    </SellerNav>
  );
};

export default ProductReports;
