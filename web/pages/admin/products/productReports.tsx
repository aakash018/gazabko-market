import React, { useEffect, useState } from "react";

import styles from "../../../styles/components/Admin/pages/productReports.module.scss";
import AdminLayout from "../../../components/Admin/AdminNav";

import axios from "axios";
import { ReportType } from "../../../@types/rrr";
import { useAlert } from "../../_app";
import ProductReportHolder from "../../../components/Admin/shared/ProductReportHolder";

const ProductReviews: React.FC = () => {
  const [reports, setReports] = useState<ReportType[]>([]);
  const [loading, setLoading] = useState(false);
  const { setAlert } = useAlert();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get<RespondType & { reports: ReportType[] }>(
        `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/products/getReports`,
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminLayout>
      <div style={{ marginBottom: 40 }}>
        <h1>Product Reviews</h1>
      </div>
      <div className={styles.productsReported}>
        {loading && <h2>Loading...</h2>}
        {!loading && reports.length === 0 && <h2>No reports found</h2>}
        {!loading &&
          reports.length !== 0 &&
          reports.map((report, i) => (
            <ProductReportHolder
              afterHideOrUnhide={fetchData}
              report={report}
              type="admin"
              key={i}
            />
          ))}
      </div>
    </AdminLayout>
  );
};

export default ProductReviews;
