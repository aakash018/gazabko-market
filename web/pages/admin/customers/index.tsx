import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/Admin/AdminNav";
import CustomersInfoHolder from "../../../components/Admin/shared/CustomersInfoHolder";
import SearchBar from "../../../components/Admin/shared/SearchBar";

import styles from "../../../styles/components/Admin/pages/CustomerPage.module.scss";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Router from "next/router";
import axios from "axios";
import { useAlert } from "../../_app";

type TableDef = {
  SN: number;
  Name: string;
  "Signed Up Date": string;
  "Total Items Boughts": number;
  Details: any;
  id: number;
};

const CustomerPage = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [topCustomers, setTopCustomer] = useState<User[]>([]);
  const [recentCustomer, setRecentCustomer] = useState<User[]>([]);
  const [topLoading, setTopLoading] = useState(false);
  const { setAlert } = useAlert();

  const [rowData, setRowData] = useState<TableDef[]>([]);

  const [columnDefs] = useState([
    { field: "SN", width: 60 },
    { field: "Name" },
    { field: "Signed Up Date", width: 200 },
    { field: "Total Items Boughts" },
    {
      field: "Details",
      width: 150,
      cellRenderer: () => (
        <div
          style={{
            fontWeight: "bold",
            color: "#5494F5",
          }}
        >
          View
        </div>
      ),
    },
  ]);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      (async () => {
        try {
          setTopLoading(true);
          const res = await axios.get<
            RespondType & {
              topCustomers: User[];
              recentCustomers: User[];
            }
          >(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/customers/getTopAndRecentCustomers`,
            {
              withCredentials: true,
            }
          );
          setTopLoading(false);
          if (res.data.status === "ok") {
            setTopCustomer(res.data.topCustomers);
            setRecentCustomer(res.data.recentCustomers);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        } catch (e) {
          console.log(e);
          setAlert({
            type: "error",
            message: "failed to load top and recent customer",
          });
        }
      })();

      (async () => {
        try {
          setTopLoading(true);
          const res = await axios.get<
            RespondType & {
              customers: User[];
            }
          >(
            `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/admin/customers/getAllCustomers`,
            {
              withCredentials: true,
            }
          );
          setTopLoading(false);
          if (res.data.status === "ok") {
            const customersForTable: TableDef[] = res.data.customers.map(
              (customer, i) => {
                return {
                  SN: i + 1,
                  "Signed Up Date": customer.created_at,
                  "Total Items Boughts": customer.totalItemsBought,
                  Details: "",
                  Name: `${customer.firstName} ${customer.lastName}`,
                  id: customer.id,
                };
              }
            );
            setRowData(customersForTable);
          } else {
            setAlert({
              type: "error",
              message: res.data.message,
            });
          }
        } catch (e) {
          console.log(e);
          setAlert({
            type: "error",
            message: "failed to load top and recent customer",
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
      <h1>Customers</h1>
      <div className={styles.customers}>
        <div className={styles.topShowcase}>
          {!topLoading && topCustomers && recentCustomer && (
            <>
              <div className={styles.topBuyers}>
                <CustomersInfoHolder
                  title="Recently Added Customers"
                  customers={topCustomers}
                  type="admin"
                />
              </div>
              <div className={styles.newCusomers}>
                <CustomersInfoHolder
                  title="Top Customers"
                  customers={recentCustomer}
                  type="admin"
                />
              </div>{" "}
            </>
          )}
        </div>
        <div className={styles.allCustomers}>
          <h2>All Customers</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "fit-content",
              gap: "20px",
            }}
          >
            <div className={styles.search}>
              <SearchBar inputRef={searchRef} />
            </div>
            <div className={styles.tables}>
              <div className={`ag-theme-alpine ${styles.mainTable}`}>
                <AgGridReact
                  rowData={rowData}
                  columnDefs={columnDefs}
                  onCellClicked={(e) => {
                    if (e.colDef.field === "Details") {
                      Router.push(`/admin/customers/id?uid=${e.data?.id}`);
                    }
                  }}
                ></AgGridReact>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CustomerPage;
