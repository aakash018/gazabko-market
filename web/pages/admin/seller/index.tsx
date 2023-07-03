import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { MdDisabledVisible, MdPending } from "react-icons/md";
import AdminLayout from "../../../components/Admin/AdminNav";
import InfoCard from "../../../components/Admin/shared/InfoCard";

import styles from "../../../styles/components/Admin/pages/SellerPage.module.scss";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Router from "next/router";
import axios from "axios";
import { useAlert } from "../../_app";
import { Seller } from "../../../@types/global";

interface TableDef {
  SN: number;
  "Vendor's Name": string;
  "Items sold": number;
  Details: any;
  id: number;
}

interface SellerCountType {
  pending: number;
  verified: number;
  deactivated: number;
}

const VendorPage = () => {
  const [rowData, setRowData] = useState<TableDef[]>([]);

  const { setAlert } = useAlert();

  const [columnDefs] = useState([
    { field: "SN", width: 60 },
    { field: "Vendor's Name" },
    { field: "Items sold" },
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
      (async () => {
        try {
          const res = await axios.get<RespondType & { sellers?: Seller[] }>(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/seller/topSellers`,
            {
              withCredentials: true,
            }
          );

          if (res.data.status === "ok" && res.data.sellers) {
            const sellerTableRow: TableDef[] = res.data.sellers.map(
              (seller, i) => ({
                SN: i + 1,
                "Items sold": seller.itemsSold,
                "Vendor's Name": seller.storeName,
                Details: "",
                id: seller.id,
              })
            );
            setRowData(sellerTableRow);
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
          <div className={styles.title}>Top Sellers</div>
          <div className={`ag-theme-alpine ${styles.main}`}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              onCellClicked={(e) => {
                if (e.colDef.field === "Details" && e.data) {
                  Router.push(`/admin/seller/id?sid=${e.data.id}`);
                }
              }}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default VendorPage;
