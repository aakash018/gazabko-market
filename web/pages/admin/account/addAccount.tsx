import React from "react";
import AdminLayout from "../../../components/Admin/AdminNav";
import Button from "../../../components/shared/Button";
import IntputField from "../../../components/shared/Input";

const addAccount = () => {
  return (
    <AdminLayout>
      <h1>Add Account</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            width: "40%",

            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <IntputField label="New Account's Username" />
          <IntputField label="New Account's Password" type={"password"} />
          <IntputField label="Confirm Password" type={"password"} />
        </div>
        <div>
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "var(--theme-color)",
            }}
          >
            Permissions
          </div>
          <div
            style={{
              fontSize: "1.3rem",
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginTop: "10px",
            }}
          >
            Let this account add other sub Accounts
            <input type={"checkbox"} />
          </div>
          <div
            style={{
              marginTop: "20px",
            }}
          >
            <Button>Save</Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default addAccount;
