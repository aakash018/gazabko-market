import axios from "axios";
import Router from "next/router";
import { userAgent } from "next/server";
import React, { useEffect, useRef, useState } from "react";
import { FollowerResponseType } from "../../../@types/global";
import CustomersInfoHolder from "../../../components/Admin/shared/CustomersInfoHolder";
import SellerNav from "../../../components/Seller/SellerNav";

import styles from "../../../styles/components/Seller/pages/CustomerPage.module.scss";
import { TableHolder } from "../../admin/orders";
import { useAlert } from "../../_app";

type TableDef = {
  SN: number;
  Name: string;
  "Signed Up Date": string;
  "Total Items Boughts": number;
  Uid: number;
};

const CustomersPage = () => {
  const searchRef = useRef<HTMLInputElement>(null);

  const [recentFollower, setRecentFollower] = useState<FollowerResponseType[]>(
    []
  );
  const { setAlert } = useAlert();

  const [rowData, setRowData] = useState<TableDef[]>([]);

  const [columnDefs] = useState([
    { field: "SN", width: 60 },
    { field: "Uid" },
    { field: "Name", width: 120 },
    { field: "Signed Up Date", width: 200 },
    { field: "Total Items Boughts" },
  ]);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      try {
        (async () => {
          const res = await axios.get<
            RespondType & {
              followers: FollowerResponseType[];
            }
          >(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/followers/recentFollowers`,
            { withCredentials: true }
          );
          console.log(res.data);
          if (res.data.status === "ok" && res.data.followers) {
            setRecentFollower(res.data.followers);
          }
        })();
      } catch {}
    }
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      try {
        (async () => {
          const res = await axios.get<
            RespondType & {
              followers?: { user: User; userId: number; sellerId: number }[];
            }
          >(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/seller/followers/all`,
            { withCredentials: true }
          );

          if (res.data.status === "ok") {
            const allFollowers: TableDef[] | undefined =
              res.data.followers?.map((follower, i) => ({
                SN: i,
                Name: follower.user.lastName,
                "Signed Up Date": follower.user.created_at.split("T")[0],
                "Total Items Boughts": 10,
                Uid: follower.user.id,
              }));

            setRowData(allFollowers as TableDef[]);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        })();
      } catch {
        setAlert({
          type: "error",
          message: "faied to get followers",
        });
      }
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <SellerNav>
      <h1>Customers</h1>
      <div className={styles.topShowcase}>
        <div className={styles.topBuyers}>
          <CustomersInfoHolder
            title="Recently Added Followers"
            customers={recentFollower}
          />
        </div>
        <div className={styles.newCusomers}>
          <CustomersInfoHolder
            title="Top Followers This Month"
            customers={recentFollower}
          />
        </div>
      </div>
      <div className={styles.allCustomemrs}>
        <TableHolder
          rowData={rowData}
          columData={columnDefs}
          inputRef={searchRef}
          title="All Followers"
          width={790}
          onRowClick={(event) => {
            Router.push(`/seller/customers/id?uid=${event.data.Uid}`);
          }}
        />
      </div>
    </SellerNav>
  );
};

export default CustomersPage;
