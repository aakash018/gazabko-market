import Router from "next/router";
import React from "react";
import AdminLayout from "../../../components/Admin/AdminNav";
import Button from "../../../components/shared/Button";
import IntputField from "../../../components/shared/Input";

import styles from "../../../styles/components/Admin/pages/Account.module.scss";

const Account = () => {
  return (
    <AdminLayout>
      <h1>Account's Settings</h1>
      <div className={styles.addAccounts}>
        <div className={styles.title}>Add Accounts</div>
        <div className={styles.content}>
          <div className={styles.subTitle}>
            You can add sub admin accounts and give them permissions accordingly
          </div>
          <div className={styles.actBtn}>
            <Button
              onClick={() => {
                Router.push("/admin/account/addAccount");
              }}
            >
              Add an Account
            </Button>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          margin: "20px",
          width: "40%",
        }}
      >
        <IntputField label="Name" />
        <IntputField label="Address" />
        <IntputField label="Username" />
        <IntputField label="Phone No." />
        <IntputField label="Email" />
        <div
          style={{
            marginTop: "10px",
          }}
        >
          <Button>Save</Button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          margin: "20px",
        }}
      >
        <h2
          style={{
            color: "var(--theme-color)",
          }}
        >
          Password Change
        </h2>
        <div
          style={{
            width: "40%",
          }}
        >
          <IntputField label="Old Password" type={"password"} />
          <IntputField label="New Password" type={"password"} />
          <IntputField label="Confirm Password" type={"password"} />
          <Button>Save</Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Account;
