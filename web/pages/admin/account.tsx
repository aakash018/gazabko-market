import React from "react";
import AdminLayout from "../../components/Admin/AdminNav";
import Button from "../../components/shared/Button";
import IntputField from "../../components/shared/Input";

const Account = () => {
  return (
    <AdminLayout>
      <h1>Account's Settings</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          margin: "20px",
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
        <IntputField label="Old Password" type={"password"} />
        <IntputField label="New Password" type={"password"} />
        <IntputField label="Confirm Password" type={"password"} />
        <Button>Save</Button>
      </div>
    </AdminLayout>
  );
};

export default Account;
