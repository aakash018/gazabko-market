import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { MdDisabledVisible, MdPending, MdWarning } from "react-icons/md";
import AdminLayout from "../../../components/Admin/AdminNav";
import InfoCard from "../../../components/Admin/shared/InfoCard";

import styles from "../../../styles/components/Admin/pages/SellerPage.module.scss";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Router from "next/router";
import { TbDisabled } from "react-icons/tb";
import axios from "axios";
import { setLabels } from "react-chartjs-2/dist/utils";
import { count } from "console";
import { useAlert } from "../../_app";

interface TableDef {
  SN: number;
  "Vendor's Name": string;
  "Items sold last month": number;
  Details: any;
}

interface SellerCountType {
  pending: number;
  verified: number;
  deactivated: number;
}

const VendorPage = () => {
  const [rowData] = useState<TableDef[]>([
    {
      SN: 1,
      "Vendor's Name": "Laxmi Store",
      "Items sold last month": 40,
      Details: "",
    },
    {
      SN: 1,
      "Vendor's Name": "Laxmi Store",
      "Items sold last month": 40,
      Details: "",
    },
    {
      SN: 3,
      "Vendor's Name": "Laxmi Store",
      "Items sold last month": 40,
      Details: "",
    },
    {
      SN: 5,
      "Vendor's Name": "Laxmi Store",
      "Items sold last month": 40,
      Details: "",
    },
    {
      SN: 6,
      "Vendor's Name": "Laxmi Store",
      "Items sold last month": 40,
      Details: "",
    },
    {
      SN: 7,
      "Vendor's Name": "Laxmi Store",
      "Items sold last month": 40,
      Details: "",
    },
    {
      SN: 8,
      "Vendor's Name": "Laxmi Store",
      "Items sold last month": 40,
      Details: "",
    },
    {
      SN: 9,
      "Vendor's Name": "Laxmi Store",
      "Items sold last month": 40,
      Details: "",
    },
    {
      SN: 10,
      "Vendor's Name": "Laxmi Store",
      "Items sold last month": 40,
      Details: "",
    },
  ]);

  const { setAlert } = useAlert();

  const [columnDefs] = useState([
    { field: "SN", width: 60 },
    { field: "Vendor's Name" },
    { field: "Items sold last month" },
    {
      field: "Details",
      width: 90,
      cellRenderer: () => (
        <div
          style={{
            color: "#5494F5",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={() => Router.push("/admin/seller/laxmi-store")}
        >
          View
        </div>
      ),
    },
  ]);
  const [sellerCount, setSellerCount] = useState<SellerCountType | null>(null);
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      (async () => {
        try {
          const res = await axios.get<
            RespondType & { count?: SellerCountType }
          >(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/getCounts/getSellerCounts`,
            {
              withCredentials: true,
            }
          );

          if (res.data.status === "ok" && res.data.count) {
            setSellerCount(res.data.count);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        } catch {
          setAlert({
            type: "error",
            message: "failed to load counts",
          });
        }
      })();
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <AdminLayout>
      <div className={styles.VendorWraper}>
        <h1>Vendors</h1>
        <div className={styles.infoTabs}>
          {sellerCount && (
            <>
              {" "}
              <InfoCard
                title="Pending Verifications"
                amount={sellerCount.pending}
                bgColor="#F36868"
                onViewClick={() => {
                  Router.push("/admin/seller/pendingVerification");
                }}
              >
                <MdPending />
              </InfoCard>
              <InfoCard
                title="Verified Vendors"
                amount={sellerCount.verified}
                bgColor="#5494F5"
                onViewClick={() => {
                  Router.push("/admin/seller/verified");
                }}
              >
                <BiCheckCircle />
              </InfoCard>
              <InfoCard
                title="Deactivated Vendors"
                amount={sellerCount.deactivated}
                bgColor="#EC1E5C"
                onViewClick={() => {
                  Router.push("/admin/seller/deactivated");
                }}
              >
                <MdDisabledVisible />
              </InfoCard>{" "}
            </>
          )}
        </div>
        <div className={styles.topVendors}>
          <div className={styles.title}>Top Vendors of Last Month</div>
          <div className="ag-theme-alpine" style={{ height: 450, width: 580 }}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
            ></AgGridReact>
          </div>
        </div>
        <div className={styles.topVendors}>
          <div className={styles.title}>Vendors Verified this month</div>
          <div className="ag-theme-alpine" style={{ height: 450, width: 580 }}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default VendorPage;
